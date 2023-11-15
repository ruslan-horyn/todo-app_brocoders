import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FindAllTodoDto } from './dto/find-all-todo.dto';

@ApiBearerAuth()
@ApiTags('Todo')
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'todo',
  version: '1',
})
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  create(
    @Query('todoListId', ParseIntPipe) todoListId: number,
    @Body() createTodoDto: CreateTodoDto,
  ) {
    return this.todoService.create(todoListId, createTodoDto);
  }

  @Get()
  findAll(@Query() query: FindAllTodoDto) {
    return this.todoService.findAll(query);
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @Query('todoListId', ParseIntPipe) todoListId: number,
  ) {
    return this.todoService.findOne(todoListId, id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Query('todoListId', ParseIntPipe) todoListId: number,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    return this.todoService.update(todoListId, id, updateTodoDto);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Query('todoListId', ParseIntPipe) todoListId: number,
  ) {
    return this.todoService.remove(todoListId, id);
  }
}
