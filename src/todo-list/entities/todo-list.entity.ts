import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Todo } from './../../todo/entities/todo.entity';
import { User } from './../../users/entities/user.entity';
import { EntityHelper } from './../../utils/entity-helper';

@Entity('todo_list')
export class TodoList extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String, nullable: false })
  name: string;

  @OneToMany(() => Todo, (todo) => todo.todoList)
  todos: Todo[];

  @ManyToOne(() => User, (user) => user.todoLists, {
    nullable: false,
  })
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
