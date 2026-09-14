import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../../generated/prisma/enums.js';
import { PriorityLevel } from '../../generated/prisma/enums.js';
import { Transform } from 'class-transformer';

export class TaskFilterDTO {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsEnum(PriorityLevel)
  priority?: PriorityLevel;

  @IsOptional()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  deadline?: Date;

  @IsOptional()
  @IsString()
  search?: string;
}
