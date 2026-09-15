import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsDate,
  Matches,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { TaskStatus } from '../../generated/prisma/enums.js';
import { PriorityLevel } from '../../generated/prisma/enums.js';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTaskDto {
  @IsString()
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @ApiProperty({
    description: 'Task title',
    example: 'Learn Swagger',
  })
  title: string;

  @IsString()
  @IsOptional()
  @Transform(({ value }) => value.trim())
  @ApiPropertyOptional({
    description: 'Task description',
    example: 'Learn Swagger to use OpenAPI',
  })
  description?: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  @ApiProperty({
    description: 'Task status',
    enum: TaskStatus,
    enumName: 'TaskStatus',
    example: 'TODO',
  })
  status: TaskStatus;

  @IsOptional()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  @ApiPropertyOptional({
    description: 'Task deadline',
    example: '2026-09-20T14:00:00.000Z',
  })
  deadline?: Date;

  @IsOptional()
  @IsEnum(PriorityLevel)
  @ApiProperty({
    description: 'Task priority',
    enum: PriorityLevel,
    enumName: 'PriorityLevel',
    example: 'HIGH',
  })
  priority: PriorityLevel;
}
