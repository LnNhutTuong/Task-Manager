import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { UpdateTaskDto } from './dto/update-task.dto.js';
import { RoleName } from '../generated/prisma/enums.js';
import { AuthUser } from '../auth/types/jwt-payload.type.js';
import { Prisma } from '../generated/prisma/client.js';
import { TaskQueryDTO } from './dto/task-query.dto.js';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async findAll(user: AuthUser, query: TaskQueryDTO) {
    const where: Prisma.TaskWhereInput = {};

    const skip = (query.page - 1) * query.limit;
    const take = query.limit;

    if (user.role === RoleName.USER) {
      where.userId = user.id;
    }

    if (query.status) {
      where.status = query.status;
    }

    if (query.priority) {
      where.priority = query.priority;
    }

    if (query.deadline) {
      const start = new Date(query.deadline);
      const nextDay = new Date(query.deadline);

      start.setHours(0, 0, 0, 0);

      nextDay.setDate(nextDay.getDate() + 1);
      nextDay.setHours(0, 0, 0, 0);

      where.deadline = {
        gte: start,
        lt: nextDay,
      };
    }

    if (query.search) {
      where.title = {
        contains: query.search,
        mode: 'insensitive',
      };
    }

    const [tasks, totalTask] = await Promise.all([
      this.prisma.task.findMany({ where, skip, take }),
      this.prisma.task.count({ where }),
    ]);

    const totalPage = Math.ceil(totalTask / query.limit);
    return {
      tasks,
      totalPage,
      totalTask,
      page: query.page,
    };
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
