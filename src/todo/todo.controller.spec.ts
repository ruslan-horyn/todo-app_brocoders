import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm';

describe('TodoController', () => {
  let controller: TodoController;
  let service: TodoService;

  const todoRepositoryToken = getRepositoryToken(Todo);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [
        TodoService,
        {
          provide: todoRepositoryToken,
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<TodoController>(TodoController);
    service = module.get<TodoService>(TodoService);
  });

  it('should call findAll method', async () => {
    jest.spyOn(service, 'findAll').mockResolvedValueOnce([] as any);

    const query = { todoListId: 1, limit: 10, page: 1 };
    const findAllSpy = jest.spyOn(controller, 'findAll');

    await controller.findAll(query);
    expect(findAllSpy).toHaveBeenCalledWith(query);
  });
});
