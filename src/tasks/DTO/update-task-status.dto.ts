import { IsEnum, IsNotEmpty } from 'class-validator';
import { TaskStatus } from '../task-status.enum';

export default class UpdateTaskStatusDTO {
  @IsNotEmpty()
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
