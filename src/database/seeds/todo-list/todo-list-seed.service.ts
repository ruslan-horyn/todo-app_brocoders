import { TodoList } from './../../../todo-list/entities/todo-list.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TodoListSeedService {
  constructor(
    @InjectRepository(TodoList)
    private repository: Repository<TodoList>,
  ) {}

  async run() {
    const count = await this.repository.count();

    if (!count) {
      await this.repository.save([
        this.repository.create({
          name: 'To Learn',
          userId: 1,
        }),
        this.repository.create({
          name: 'Daily Tasks',
          userId: 2,
        }),
      ]);
    }
  }
}
