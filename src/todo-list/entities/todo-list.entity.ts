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

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @OneToMany(() => Todo, (todo) => todo.todoList)
  todos: Todo[];

  @ManyToOne(() => User, (user) => user.todoLists, {
    nullable: false,
  })
  private user: User;

  @Column({ type: 'integer', nullable: false })
  userId: number;

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
