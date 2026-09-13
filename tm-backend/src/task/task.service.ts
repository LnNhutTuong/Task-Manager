import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { UpdateTaskDto } from './dto/update-task.dto.js';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.task.findMany();
  }

  async findOne(id: number) {
    let task = await this.prisma.task.findUnique({
      where: {
        id,
      },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  createTask(dto: CreateTaskDto) {
    return this.prisma.task.create({
      data: {
        title: dto.title,
        description: dto.description,
        status: dto.status,
        userId: 1,
      },
    });
  }

  updateTask(id: number, dto: UpdateTaskDto) {
    return this.prisma.task.update({
      where: {
        id,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteTask(id: number) {
    let task = await this.prisma.task.findUnique({
      where: { id },
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
