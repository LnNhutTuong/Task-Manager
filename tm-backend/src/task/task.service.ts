import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { UpdateTaskDto } from './dto/update-task.dto.js';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  findAll(userId: number) {
    return this.prisma.task.findMany({
      where: {
        userId,
      },
    });
  }

  async findOne(id: number, userId: number) {
    const task = await this.prisma.task.findUnique({
      where: {
        id,
        userId,
      },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  createTask(dto: CreateTaskDto, userId: number) {
    return this.prisma.task.create({
      data: {
        title: dto.title,
        description: dto.description,
        status: dto.status,
        userId,
      },
    });
  }

  async updateTask(id: number, dto: UpdateTaskDto, userId: number) {
    const task = await this.prisma.task.findUnique({
      where: {
        id,
        userId,
      },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return this.prisma.task.update({
      where: {
        id,
        userId,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteTask(id: number, userId: number) {
    const task = await this.prisma.task.findUnique({
      where: {
        id,
        userId,
      },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return this.prisma.task.delete({
      where: {
        id,
        userId,
      },
    });
  }
}
