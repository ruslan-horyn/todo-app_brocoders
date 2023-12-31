import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationService } from 'src/pagination/pagination.service';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateTodoListDto } from './dto/create-todo-list.dto';
import { UpdateTodoListDto } from './dto/update-todo-list.dto';
import { TodoList } from './entities/todo-list.entity';

@Injectable()
export class TodoListService extends PaginationService {
  constructor(
    @InjectRepository(TodoList)
    private todoListRepository: Repository<TodoList>,
  ) {
    super();
  }

  create(createTodoListDto: CreateTodoListDto, userId: User['id']) {
    return this.todoListRepository.save({
      ...createTodoListDto,
      userId,
    });
  }

  findAll(userId: User['id'], page: number, limit: number) {
    return this.getPagination({
      repository: this.todoListRepository,
      where: {
        userId,
      },
      order: {
        createdAt: 'ASC',
      },
      page,
      limit,
    });
  }

  async findOne(id: TodoList['id'], userId: User['id']) {
    const todoList = await this.todoListRepository.findOneBy({
      id,
      userId,
    });

    if (!todoList) {
      throw new NotFoundException('Todo list not found');
    }

    return todoList;
  }

  async update(
    id: TodoList['id'],
    updateTodoListDto: UpdateTodoListDto,
    userId: User['id'],
  ) {
    const todoList = await this.todoListRepository.update(
      {
        id,
        userId,
      },
      updateTodoListDto,
    );

    if (!todoList.affected) {
      throw new HttpException(
        `Cannot update todo list with this id: ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async remove(id: TodoList['id'], userId: User['id']) {
    const todoList = await this.todoListRepository.softDelete({
      id,
      userId,
    });

    if (!todoList.affected) {
      throw new HttpException(
        `Cannot remove todo list with this id: ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
