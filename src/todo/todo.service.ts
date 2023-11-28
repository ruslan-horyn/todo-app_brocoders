import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationService } from './../pagination/pagination.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { FindAllTodoDto } from './dto/find-all-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService extends PaginationService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {
    super();
  }

  create(todoListId: number, createTodoDto: CreateTodoDto) {
    return this.todoRepository.save({
      ...createTodoDto,
      todoList: {
        id: todoListId,
      },
    });
  }

  findAll({ todoListId, page, limit }: FindAllTodoDto) {
    return this.getPagination({
      repository: this.todoRepository,
      where: {
        todoList: {
          id: todoListId,
        },
      },
      order: {
        createdAt: 'ASC',
      },
      page,
      limit,
    });
  }

  async findOne(todoListId: number, id: number) {
    const todo = await this.todoRepository.findOne({
      where: {
        id,
        todoList: {
          id: todoListId,
        },
      },
    });

    if (!todo) {
      throw new HttpException(
        `Cannot find todo with this id: ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }

    return todo;
  }

  async update(todoListId: number, id: number, updateTodoDto: UpdateTodoDto) {
    const todo = await this.todoRepository.update(
      {
        id,
        todoList: {
          id: todoListId,
        },
      },
      updateTodoDto,
    );

    if (!todo.affected) {
      throw new HttpException(
        `Cannot update todo with this id: ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async remove(todoListId: number, id: number) {
    const todo = await this.todoRepository.softDelete({
      id,
      todoList: {
        id: todoListId,
      },
    });

    if (!todo.affected) {
      throw new HttpException(
        `Cannot remove todo with this id: ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
