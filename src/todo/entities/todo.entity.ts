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

  @Column({ type: 'varchar', nullable: false, unique: true })
  title: string;

  @Column({ type: 'boolean', nullable: false })
  completed: boolean;

  @ManyToOne(() => TodoList, (todoList) => todoList.todos, {
    nullable: false,
  })
  todoList: TodoList;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
