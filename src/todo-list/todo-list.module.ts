import { Module } from '@nestjs/common';
import { TodoListService } from './todo-list.service';
import { TodoListController } from './todo-list.controller';
import { TodoList } from './entities/todo-list.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';

@Module({
  imports: [TypeOrmModule.forFeature([TodoList])],
  controllers: [TodoListController],
  providers: [IsExist, IsNotExist, TodoListService],
  exports: [TodoListService],
})
export class TodoListModule {}
