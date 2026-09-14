import { IntersectionType } from '@nestjs/mapped-types';
import { TaskFilterDTO } from './task-filter.dto.js';
import { TaskPaginationDTO } from './pagination.dto.js';
export class TaskQueryDTO extends IntersectionType(
  TaskFilterDTO,
  TaskPaginationDTO,
) {}
