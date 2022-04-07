import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from "argon2"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService
    ) { }

    async signup(dto: AuthDto) {
        try {
            // generate the password hash
            const hash = await argon.hash(dto.password);
            // save the new user in the db
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    firstName: dto.firstName,
                    hash
                }
            })

            // return the saved user
            return this.signToken(user.id, user.email)

        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException(
                        'E-mail already registered'
                    )
                }
            }
            throw error
        }
    }

    async signin(dto: AuthDto) {
        // find the user by email
        const user = await this.prisma.user.findFirst({
            where: {
                email: dto.email
            }
        })
        // if user is not found throw exception
        if (!user) throw new ForbiddenException(
            'User not found'
        )
        // compare password
        const pwMatches = await argon.verify(
            user.hash,
            dto.password
        )
        // if password is not equal throw exception
        if (!pwMatches) throw new ForbiddenException(
            'Password is incorrect'
        )
        // send back the user
        return this.signToken(user.id, user.email)
    }

    async signToken(
        userId: number,
        email: string
    ): Promise<{acess_token: string}> {
        const payload = {
            sub: userId,
            email
        }
        const secret = this.config.get('JWT_SECRET')
        const token = await this.jwt.signAsync(payload, {
            expiresIn: '1440m',
            secret: secret
        }
        )

        return {
            acess_token: token
        }
    }
}