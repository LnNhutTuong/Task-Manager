import { IsEnum } from 'class-validator';
export enum SortField {
  CREATED_AT = 'createdAt',
  DEADLINE = 'deadline',
  PRIORITY = 'priority',
  TITLE = 'title',
}

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export class TaskSortingDTO {
  @IsEnum(SortField)
  sortBy: SortField = SortField.CREATED_AT;

  @IsEnum(SortOrder)
  sortOrder: SortOrder = SortOrder.DESC;
}
