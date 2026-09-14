import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { UpdateTaskDto } from './dto/update-task.dto.js';
import { RoleName } from '../generated/prisma/enums.js';
import { AuthUser } from '../auth/types/jwt-payload.type.js';

type TaskWhere = {
  userId?: number;
};

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  findAll(user: AuthUser) {
    const where: TaskWhere = {};

    if (user.role === RoleName.USER) {
      where.userId = user.id;
    }

    return this.prisma.task.findMany({ where });
  }

  async findOne(id: number, user: AuthUser) {
    const where: TaskWhere = {};

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
        userId: user.id,
      },
    });
  }

  async updateTask(id: number, dto: UpdateTaskDto, user: AuthUser) {
    const where: TaskWhere = {};

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
    const where: TaskWhere = {};

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
