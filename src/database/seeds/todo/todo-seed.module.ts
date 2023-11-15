import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './../../../todo/entities/todo.entity';
import { TodoSeedService } from './todo-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  providers: [TodoSeedService],
  exports: [TodoSeedService],
})
export class TodoSeedModule {}
