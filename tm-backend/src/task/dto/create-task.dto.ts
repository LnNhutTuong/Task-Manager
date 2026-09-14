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

export class CreateTaskDto {
  @IsString()
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  @Transform(({ value }) => value.trim())
  description?: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status: TaskStatus;

  @IsOptional()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  deadline?: Date;
}
