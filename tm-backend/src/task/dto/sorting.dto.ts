import { IsEnum } from 'class-validator';
enum SortField {
  CREATED_AT = 'createdAt',
  DEADLINE = 'deadline',
  PRIORITY = 'priority',
  TITLE = 'title',
}

enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export class TaskSortingDTO {
  @IsEnum(SortField)
  sortBy: SortField = SortField.CREATED_AT;

  @IsEnum(SortOrder)
  sortOrder: SortOrder = SortOrder.DESC;
}
