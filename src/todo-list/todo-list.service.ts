import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateTodoListDto } from './dto/create-todo-list.dto';
import { UpdateTodoListDto } from './dto/update-todo-list.dto';
import { TodoList } from './entities/todo-list.entity';

@Injectable()
export class TodoListService {
  constructor(
    @InjectRepository(TodoList)
    private todoListRepository: Repository<TodoList>,
  ) {}

  create(createTodoListDto: CreateTodoListDto, userId: User['id']) {
    return this.todoListRepository.save({
      ...createTodoListDto,
      userId,
    });
  }

  findAll(userId: User['id']) {
    return this.todoListRepository.findBy({
      user: {
        id: userId,
      },
    });
  }

  async findOne(id: number, userId: User['id']) {
    const todoList = await this.todoListRepository.findOneBy({
      id,
      user: {
        id: userId,
      },
    });

    if (!todoList) {
      throw new NotFoundException('Todo list not found');
    }

    return todoList;
  }

  async update(
    id: number,
    updateTodoListDto: UpdateTodoListDto,
    userId: User['id'],
  ) {
    const todoList = await this.todoListRepository.update(
      {
        id,
        user: {
          id: userId,
        },
      },
      updateTodoListDto,
    );

    if (!todoList.affected) {
      throw new BadRequestException();
    }
  }

  async remove(id: number, userId: User['id']) {
    const todoList = await this.todoListRepository.softDelete({
      id,
      user: {
        id: userId,
      },
    });

    if (!todoList.affected) {
      throw new BadRequestException();
    }
  }
}
