import { TodoList } from './../../../todo-list/entities/todo-list.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

const todoLists = [
  'Learn',
  'Daily Tasks',
  'Work',
  'Personal',
  'Shopping',
  'Travel',
  'Health',
  'Family',
  'Friends',
  'Movies',
  'Music',
  'Books',
  'Sports',
  'Food',
  'Games',
  'Religion',
  'Politics',
  'Science',
  'Technology',
  'Art',
  'History',
  'Other',
];
@Injectable()
export class TodoListSeedService {
  constructor(
    @InjectRepository(TodoList)
    private repository: Repository<TodoList>,
  ) {}

  async run() {
    const count = await this.repository.count();

    if (!count) {
      await this.repository.save(
        todoLists.map((name) =>
          this.repository.create({
            name,
            userId: 1,
          }),
        ),
      );
    }
  }
}
