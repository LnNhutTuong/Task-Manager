import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from './task.controller.js';
import { TaskService } from './task.service.js';
import { PrismaService } from '../prisma/prisma.service.js';

describe('TaskController', () => {
  let controller: TaskController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [TaskService, PrismaService],
    }).compile();

    controller = module.get<TaskController>(TaskController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
