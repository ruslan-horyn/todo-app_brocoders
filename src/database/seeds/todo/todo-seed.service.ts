import { Todo } from './../../../todo/entities/todo.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

const technologies = [
  'NestJS',
  'React',
  'NextJS',
  'TypeScript',
  'JavaScript',
  'NodeJS',
  'React Native',
  'Flutter',
  'Angular',
  'Vue',
  'Svelte',
  'Java',
  'Kotlin',
  'Swift',
  'C#',
  'C++',
  'C',
  'Python',
  'Ruby',
  'Go',
  'Rust',
  'PHP',
  'Perl',
  'Dart',
];

@Injectable()
export class TodoSeedService {
  constructor(
    @InjectRepository(Todo)
    private repository: Repository<Todo>,
  ) {}

  async run() {
    const count = await this.repository.count();

    if (!count) {
      const todos = technologies.map((technology) =>
        this.repository.create({
          createdAt: new Date(),
          updatedAt: new Date(),
          title: `Learn ${technology}`,
          completed: false,
          todoList: {
            id: 1,
          },
        }),
      );
      await this.repository.save(todos);
    }
  }
}
