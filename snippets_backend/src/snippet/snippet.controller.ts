import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { CreateSnippetDto, EditSnippetDto } from './dto';
import { SnippetService } from './snippet.service';

@UseGuards(JwtGuard)
@Controller('snippets')
export class SnippetController {
    constructor(private snippetService: SnippetService) {}
    @Post()
    createSnippet(
        @GetUser('id') userId: number,
        @Body() dto: CreateSnippetDto) {
            return this.snippetService.createSnippet(userId, dto);
        }

    @Get()
    getSnippets(
        @GetUser('id') userId: number
        ) {
            return this.snippetService.getSnippets(userId);
        }

    @Get(':id')
    getSnipperById(
        @GetUser('id') userId: number,
        @Param('id', ParseIntPipe) snippetId: number
        ) {
            return this.snippetService.getSnippetById(userId, snippetId);
    }

    @Patch(':id')
    editSnippetById(
        @GetUser('id') userId: number,
        @Param('id', ParseIntPipe) snippetId: number,
        @Body() dto: EditSnippetDto
        ) {
            return this.snippetService.editSnippetById(userId, snippetId, dto);
        }

    @Delete(':id')
    deleteSnippetById(
        @GetUser('id') userId: number,
        @Param('id', ParseIntPipe) snippetId: number
        ) {
            return this.snippetService.deleteSnippetById(userId, snippetId)
        }
}
