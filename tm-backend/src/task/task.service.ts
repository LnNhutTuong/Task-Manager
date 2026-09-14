import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { UpdateTaskDto } from './dto/update-task.dto.js';
import { RoleName } from '../generated/prisma/enums.js';
import { AuthUser } from '../auth/types/jwt-payload.type.js';
import { TaskFilterDTO } from './dto/task-filter.dto.js';
import { TaskStatus } from '../generated/prisma/enums.js';
import { PriorityLevel } from '../generated/prisma/enums.js';
import { Prisma } from '../generated/prisma/client.js';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  findAll(user: AuthUser, filter: TaskFilterDTO) {
    const where: Prisma.TaskWhereInput = {};

    if (user.role === RoleName.USER) {
      where.userId = user.id;
    }

    if (filter.status) {
      where.status = filter.status;
    }

    if (filter.priority) {
      where.priority = filter.priority;
    }

    if (filter.deadline) {
      const start = new Date(filter.deadline);
      const nextDay = new Date(filter.deadline);

      start.setHours(0, 0, 0, 0);

      nextDay.setDate(nextDay.getDate() + 1);
      nextDay.setHours(0, 0, 0, 0);

      where.deadline = {
        gte: start,
        lt: nextDay,
      };
    }

    if (filter.search) {
      where.title = {
        contains: filter.search,
        mode: 'insensitive',
      };
    }

    return this.prisma.task.findMany({ where });
  }

  async findOne(id: number, user: AuthUser) {
    const where: Prisma.TaskWhereInput = {};

    if (user.role === RoleName.USER) {
      where.userId = user.id;
    }

    const task = await this.prisma.task.findFirst({
      where: {
        id,
        ...where,
      },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  createTask(dto: CreateTaskDto, user: AuthUser) {
    return this.prisma.task.create({
      data: {
        title: dto.title,
        description: dto.description,
        status: dto.status,
        deadline: dto.deadline,
        priority: dto.priority,
        userId: user.id,
      },
    });
  }

  async updateTask(id: number, dto: UpdateTaskDto, user: AuthUser) {
    const where: Prisma.TaskWhereInput = {};

    if (user.role === RoleName.USER) {
      where.userId = user.id;
    }

    const task = await this.prisma.task.findFirst({
      where: {
        id,
        ...where,
      },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return this.prisma.task.update({
      where: {
        id,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteTask(id: number, user: AuthUser) {
    const where: Prisma.TaskWhereInput = {};

    if (user.role === RoleName.USER) {
      where.userId = user.id;
    }

    const task = await this.prisma.task.findFirst({
      where: {
        id,
        ...where,
      },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return this.prisma.task.delete({
      where: {
        id,
      },
    });
  }
}
