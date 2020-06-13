import { Controller, Get, Post, Delete, Param, Body, Put } from '@nestjs/common';
import { Todo } from '../entities/todo.entity';
import { CreateDto, UpdateDto } from './dto';
// GetOne
// GetMany
// Post (Create Or Update)
// Delete (Delete)
@Controller('rest/todo')
export class TodoController {

    @Get()
    getAllAction(): string {
        return 'Todo Get All';
    }

    @Get(':id')
    getOneAction(@Param('id') id: string): string {
        return `Todo Get One id:${id}`;
    }

    @Post()
    createAction(@Body() todo: CreateDto): CreateDto {
        console.log(todo);
        return todo;
    }

    @Put(':id')
    updateAction(
        @Param('id') id: string,
        @Body() todo: UpdateDto
    ): UpdateDto {
        console.log(todo, 'Saved');
        return todo;
    }

    @Delete(':id')
    deleteAction(@Param('id') id: string): string {
        return `Delete Todo id:${id}`;
    }
}
