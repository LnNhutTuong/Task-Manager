import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service.js';
import { PrismaService } from '../prisma/prisma.service.js';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskService, PrismaService],
    }).compile();

    service = module.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
