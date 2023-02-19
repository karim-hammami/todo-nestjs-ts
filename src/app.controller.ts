import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common'
import { AppService } from './app.service'
import { TodoService } from './todo.service'
import { Todo as TodoModel } from '@prisma/client'

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        private readonly todoService: TodoService,
    ) { }

    @Get()
    getHello(): string {
        return this.appService.getHello()
    }

    @Get('todos')
    async getTodos(): Promise<TodoModel[]> {
        return this.todoService.todos()
    }

    @Get('todos/:id')
    async getTodoById(@Param('id') id: string): Promise<TodoModel> {
        return this.todoService.todo({ id: Number(id) })
    }

    @Post('todos')
    async createTodo(
        @Body() todoData: { title: string; desc: string },
    ): Promise<TodoModel> {
        const { title, desc } = todoData
        return this.todoService.createTodo({
            title,
            desc,
        })
    }

    @Put('todos/:id')
    async updateTodoById(
        @Param('id') id: string,
        @Body() todoData: { title: string; desc: string; status: string },
    ): Promise<TodoModel> {
        const { title, desc, status } = todoData
        return this.todoService.updateTodo({
            where: { id: Number(id) },
            data: {
                title,
                desc,
                status,
            },
        })
    }

    @Delete('todos/:id')
    async deleteTodo(@Param('id') id: string): Promise<TodoModel> {
        return this.todoService.deleteTodo({ id: Number(id) })
    }
}
