// eslint-disable-next-line prettier/prettier
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import CreateTaskDTO from './DTO/create-task.dto';
import GetTasksFilterDTO from './DTO/get-tasks-filter.dto ';
import UpdateTaskStatusDTO from './DTO/update-task-status.dto';
import UpdateTaskDTO from './DTO/update-task.dto';
import { TaskStatus } from './task-status.enum';
import Task from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(@Query() getTasksFilterDTO: GetTasksFilterDTO): Promise<Task[]> {
    console.log('getTasksFilterDTO', getTasksFilterDTO);
    if (Object.keys(getTasksFilterDTO).length) {
      return this.tasksService.getTasksWithFilters(getTasksFilterDTO);
    } else {
      return this.tasksService.getAllTasks();
    }
  }

  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDTO) {
    return this.tasksService.createTask(createTaskDto);
  }

  @Delete('/:id')
  async deleteTask(@Param('id') id: string): Promise<TaskStatus> {
    return this.tasksService.deleteTask(id);
  }

  @Delete('/:id/prune')
  async pruneTask(@Param('id') id: string): Promise<string> {
    return this.tasksService.pruneTask(id);
  }

  @Get('/:id')
  async getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Put('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDTO: UpdateTaskStatusDTO,
  ): Promise<Task> {
    console.log(1);
    console.log(2);
    console.log(3);
    return this.tasksService.updateTaskStatus(id, updateTaskStatusDTO);
  }

  @Put('/:id')
  updateTask(
    @Param('id') id: string,
    @Body('updateTaskDto') updateTaskDto: UpdateTaskDTO,
  ): Promise<Task> {
    return this.tasksService.updateTask(id, updateTaskDto);
  }
}
