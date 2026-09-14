import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { TaskService } from './task.service.js';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { UpdateTaskDto } from './dto/update-task.dto.js';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import type { AuthUser } from '../auth/types/jwt-payload.type.js';
import { CurrentUser } from '../auth/decorators/current-user.decorator.js';

@UseGuards(JwtAuthGuard)
@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get('all')
  async getAllTasks(@CurrentUser() user: AuthUser) {
    let userId = user?.id;

    let tasks = await this.taskService.findAll(userId);

    return {
      message: 'Get all tasks successfully',
      data: tasks,
    };
  }

  @Get(`:id`)
  async findOne(
    @Param(`id`, ParseIntPipe) id: number,
    @CurrentUser() user: AuthUser,
  ) {
    let userId = user?.id;
    let task = await this.taskService.findOne(id, userId);

    return {
      message: 'Get task with id successfully',
      data: task,
    };
  }

  @Post(`create`)
  async createTask(@Body() dto: CreateTaskDto, @CurrentUser() user: AuthUser) {
    let userId = user?.id;
    let task = await this.taskService.createTask(dto, userId);
    return {
      message: 'Create new task successfully',
      data: task,
    };
  }

  @Patch(`:id`)
  async updateTask(
    @Param(`id`, ParseIntPipe) id: number,
    @Body() dto: UpdateTaskDto,
    @CurrentUser() user: AuthUser,
  ) {
    let userId = user?.id;
    let task = await this.taskService.updateTask(id, dto, userId);

    return {
      message: 'Update task successfully',
      data: task,
    };
  }

  @Delete(':id')
  async deleteTask(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: AuthUser,
  ) {
    let userId = user?.id;
    await this.taskService.deleteTask(id, userId);

    return {
      message: 'Delete task successfully',
      data: id,
    };
  }
}
