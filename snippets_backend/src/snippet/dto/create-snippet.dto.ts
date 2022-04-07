import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class CreateSnippetDto {
  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsNotEmpty()
  content: string

  @IsString()
  @IsNotEmpty()
  language: string

  @IsArray()
  @IsNotEmpty()
  @IsOptional()
  tags?: string[]

  @IsBoolean()
  @IsNotEmpty()
  hasSiblings: boolean

  @IsOptional()
  @IsNumber()
  siblingId?: number
  
  @IsBoolean()
  @IsNotEmpty()
  deprecated: boolean
}