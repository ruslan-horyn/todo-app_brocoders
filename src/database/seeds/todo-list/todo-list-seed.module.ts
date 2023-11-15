import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoList } from './../../../todo-list/entities/todo-list.entity';
import { TodoListSeedService } from './todo-list-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([TodoList])],
  providers: [TodoListSeedService],
  exports: [TodoListSeedService],
})
export class TodoListSeedModule {}
