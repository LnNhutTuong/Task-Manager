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
@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get('all')
  async findAll() {
    let tasks = await this.taskService.findAll();

    return {
      message: 'Get all tasks successfully',
      data: tasks,
    };
  }

  @Get(`:id`)
  async findOne(@Param(`id`, ParseIntPipe) id: number) {
    let task = await this.taskService.findOne(id);

    return {
      message: 'Get task with id successfully',
      data: task,
    };
  }

  @Post(`create`)
  async createTask(@Body() dto: CreateTaskDto) {
    let task = await this.taskService.createTask(dto);

    return {
      message: 'Create new task successfully',
      data: task,
    };
  }

  @Patch(`:id`)
  async updateTask(
    @Param(`id`, ParseIntPipe) id: number,
    @Body() dto: UpdateTaskDto,
  ) {
    let task = await this.taskService.updateTask(id, dto);

    return {
      message: 'Update task successfully',
      data: task,
    };
  }

  @Delete(':id')
  async deleteTask(@Param('id', ParseIntPipe) id: number) {
    await this.taskService.deleteTask(id);

    return {
      message: 'Delete task successfully',
      data: id,
    };
  }
}
