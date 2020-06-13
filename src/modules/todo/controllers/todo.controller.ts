import { Controller, Get, Post, Delete, Param, Body, Put, HttpException, HttpStatus } from '@nestjs/common';
import { CreateDto, UpdateDto } from './dto';
import { TodoService } from '../services/todo.service';
import { Todo } from '../entities/todo.entity';
// GetOne
// GetMany
// Post (Create Or Update)
// Delete (Delete)
@Controller('rest/todo')
export class TodoController {

    constructor(private readonly todoService: TodoService) { }

    @Get()
    getAllAction(): Promise<Todo[]> {
        return this.todoService.findAll();
    }

    @Get(':id')
    async getOneAction(@Param('id') id: string): Promise<Todo> {
        const todo = await this.todoService.findOne(id);
        if (todo == undefined) {
            throw new HttpException('Todo with id=' + id + ' not exists', HttpStatus.NOT_FOUND)
        }
        return this.todoService.findOne(id);
    }

    @Post()
    createAction(@Body() createDto: CreateDto): Promise<Todo> {
        const todo = new Todo();
        todo.title = createDto.title;
        if (createDto.isComplited !== createDto.isComplited) {
            todo.isComplited = createDto.isComplited;
        }
        return this.todoService.create(todo);
    }

    @Put(':id')
    async updateAction(
        @Param('id') id: string,
        @Body() { title, isComplited = false }: UpdateDto
    ): Promise<Todo> {
        const todo = await this.todoService.findOne(id);
        if (todo == undefined) {
            throw new HttpException('Todo with id=' + id + ' not exists', HttpStatus.NOT_FOUND)
        }
        todo.title = title;
        todo.isComplited = isComplited;
        return this.todoService.update(todo)
    }

    @Delete(':id')
    deleteAction(@Param('id') id: string): Promise<void> {
        return this.todoService.remove(id);
    }
}
