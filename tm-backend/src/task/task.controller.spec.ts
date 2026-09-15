import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from './task.controller.js';
import { TaskService } from './task.service.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { AuthModuleOptions } from '@nestjs/passport';

describe('TaskController', () => {
  let controller: TaskController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        { provide: TaskService, useValue: {} },
        { provide: JwtAuthGuard, useValue: { canActivate: () => true } },
        { provide: AuthModuleOptions, useValue: {} },
      ],
    }).compile();

    controller = module.get<TaskController>(TaskController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
