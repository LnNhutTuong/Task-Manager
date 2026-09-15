import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from './task.controller.js';
import { TaskService } from './task.service.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { AuthModuleOptions } from '@nestjs/passport';
import {
  PriorityLevel,
  RoleName,
  TaskStatus,
} from '../generated/prisma/enums.js';

describe('TaskController', () => {
  let controller: TaskController;
  const taskService = {
    createTask: vi.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        { provide: TaskService, useValue: taskService },
        { provide: JwtAuthGuard, useValue: { canActivate: () => true } },
        { provide: AuthModuleOptions, useValue: {} },
      ],
    }).compile();

    controller = module.get<TaskController>(TaskController);
  });

  it('creates a task through TaskService', async () => {
    const dto = {
      title: 'Test task',
      status: TaskStatus.TODO,
      priority: PriorityLevel.MEDIUM,
    };
    const user = { id: 1, email: 'user@example.com', role: RoleName.USER };
    const createdTask = { id: 1, ...dto, userId: user.id };
    taskService.createTask.mockResolvedValue(createdTask);

    await expect(controller.createTask(dto, user)).resolves.toEqual({
      message: 'Create new task successfully',
      data: createdTask,
    });
    expect(taskService.createTask).toHaveBeenCalledWith(dto, user);
  });
});
