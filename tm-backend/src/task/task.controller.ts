import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Body,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { TaskService } from './task.service.js';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { UpdateTaskDto } from './dto/update-task.dto.js';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import type { AuthUser } from '../auth/types/jwt-payload.type.js';
import { CurrentUser } from '../auth/decorations/current-user.decorator.js';
import { TaskFilterDTO } from './dto/task-filter.dto.js';

@UseGuards(JwtAuthGuard)
@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get('all')
  async getAllTasks(
    @CurrentUser() user: AuthUser,
    @Query() filter: TaskFilterDTO,
  ) {
    let tasks = await this.taskService.findAll(user, filter);

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
    let task = await this.taskService.findOne(id, user);

    return {
      message: 'Get task with id successfully',
      data: task,
    };
  }

  @Post(`create`)
  async createTask(@Body() dto: CreateTaskDto, @CurrentUser() user: AuthUser) {
    let task = await this.taskService.createTask(dto, user);
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
    let task = await this.taskService.updateTask(id, dto, user);

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
    await this.taskService.deleteTask(id, user);

    return {
      message: 'Delete task successfully',
      data: id,
    };
  }
}
