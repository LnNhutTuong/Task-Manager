import { PriorityLevel, TaskStatus } from '../../generated/prisma/enums.js';
import { ApiProperty } from '@nestjs/swagger';

export class TaskItemResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty({ nullable: true })
  description: string | null;

  @ApiProperty({
    enum: TaskStatus,
    enumName: 'TaskStatus',
  })
  status: TaskStatus;

  @ApiProperty({
    nullable: true,
    type: Date,
  })
  deadline: Date | null;

  @ApiProperty({
    enum: PriorityLevel,
    enumName: 'PriorityLevel',
  })
  priority: PriorityLevel;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class TaskListResponseDto {
  @ApiProperty({
    type: [TaskItemResponseDto],
  })
  tasks: TaskItemResponseDto[];

  @ApiProperty()
  totalPage: number;

  @ApiProperty()
  totalTask: number;

  @ApiProperty()
  page: number;
}

export class GetAllTaskResponseDto {
  @ApiProperty({
    example: 'Get all tasks successfully',
  })
  message: string;

  @ApiProperty({
    type: TaskListResponseDto,
  })
  data: TaskListResponseDto;
}

export class TaskResponseDto {
  @ApiProperty({
    example: 'Create new task successfully',
  })
  message: string;

  @ApiProperty({
    type: TaskItemResponseDto,
  })
  data: TaskItemResponseDto;
}

export class DeleteTaskResponseDto {
  @ApiProperty({
    example: 'Delete task successfully',
  })
  message: string;

  @ApiProperty({
    example: 1,
  })
  data: number;
}
