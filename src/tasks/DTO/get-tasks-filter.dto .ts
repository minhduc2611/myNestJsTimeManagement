import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../task-status.enum';

export default class GetTasksFilterDTO {
  @IsOptional()
  @IsEnum(TaskStatus)
  status: TaskStatus;

  @IsOptional()
  @IsString()
  search: string;

  @IsOptional()
  DateRange: TaskDateRange;
}

export enum TaskDateRange {
  TODAY = 'TODAY',
  TODAY_AND_TOMORROW = 'TODAY_AND_TOMORROW',
}
