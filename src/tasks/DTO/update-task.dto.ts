import { IsNotEmpty } from 'class-validator';

export default class UpdateTaskDTO {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: string;
}
