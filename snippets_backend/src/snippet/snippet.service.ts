import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSnippetDto, EditSnippetDto } from './dto';

@Injectable()
export class SnippetService {
    constructor(private prisma: PrismaService) {}
    async createSnippet(
        userId: number, 
        dto: CreateSnippetDto
        ) {
        const snippet = await this.prisma.snippet.create({
            data: {
                userId,
                ...dto                
            }
        })

        return snippet
    }

    getSnippets(userId: number) {
        return this.prisma.snippet.findMany({
            where: { userId }
        })
    }

    getSnippetById(userId: number, snippetId: number) {}

    editSnippetById(userId: number, snippetId: number, dto: EditSnippetDto) {}

    deleteSnippetById(userId: number, snippetId: number) {}
}
