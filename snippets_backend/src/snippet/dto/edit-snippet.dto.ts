import { IsArray, IsBoolean, IsNumber, IsOptional, IsString } from "class-validator"

export class EditSnippetDto {
  @IsString()
  @IsOptional()
  title?: String

  @IsString()
  @IsOptional()
  content?: String

  @IsString()
  @IsOptional()
  language?: String

  @IsArray()
  @IsOptional()
  tags?: Array<string>

  @IsBoolean()
  @IsOptional()
  hasSiblings?: Boolean

  @IsOptional()
  @IsNumber()
  siblingId?: Number
  
  @IsBoolean()
  @IsOptional()
  deprecated?: Boolean
}