import { PaginationService } from './../pagination/pagination.service';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { FindAllTodoDto } from './dto/find-all-todo.dto';

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
      todoListId,
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
        id: {
          order: 'ASC',
        },
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
      throw new NotFoundException('Todo not found');
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
      throw new BadRequestException();
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
      throw new BadRequestException();
    }
  }
}
