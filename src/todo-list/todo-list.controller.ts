import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';
import { RequestUser } from 'src/users/user.decorator';
import { CreateTodoListDto } from './dto/create-todo-list.dto';
import { UpdateTodoListDto } from './dto/update-todo-list.dto';
import { TodoListService } from './todo-list.service';

@ApiBearerAuth()
@ApiTags('Todo-list')
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'todo-list',
  version: '1',
})
export class TodoListController {
  constructor(private readonly todoListService: TodoListService) {}

  @Post()
  create(
    @Body() createTodoListDto: CreateTodoListDto,
    @RequestUser() user: User,
  ) {
    return this.todoListService.create(createTodoListDto, user.id);
  }

  @Get()
  findAll(@RequestUser() user: User) {
    return this.todoListService.findAll(user.id);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @RequestUser() user: User) {
    return this.todoListService.findOne(id, user.id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTodoListDto: UpdateTodoListDto,
    @RequestUser() user: User,
  ) {
    return this.todoListService.update(id, updateTodoListDto, user.id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @RequestUser() user: User) {
    return this.todoListService.remove(id, user.id);
  }
}
