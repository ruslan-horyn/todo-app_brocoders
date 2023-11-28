import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TodoList } from './../../todo-list/entities/todo-list.entity';
import { EntityHelper } from './../../utils/entity-helper';

@Entity('todo')
export class Todo extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'boolean', nullable: false })
  completed: boolean;

  @ManyToOne(() => TodoList, (todoList) => todoList.todos)
  todoList: TodoList;

  @CreateDateColumn({
    name: 'createdat',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updatedat',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deletedat',
  })
  deletedAt: Date;
}
