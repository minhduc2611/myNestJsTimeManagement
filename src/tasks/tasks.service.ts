// eslint-disable-next-line prettier/prettier
import { Injectable, NotFoundException, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { filter, isEmpty } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import CreateTaskDTO from './DTO/create-task.dto';
import GetTasksFilterDTO from './DTO/get-tasks-filter.dto ';
import UpdateTaskStatusDTO from './DTO/update-task-status.dto';
import UpdateTaskDTO from './DTO/update-task.dto';
import { TaskStatus } from './task-status.enum';
import Task from './task.entity';
import { TasksRepository } from './tasks.repository';
@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private readonly tasksRepository: TasksRepository,
  ) {}

  async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOne({ id: id });
    if (!found) {
      throw new NotFoundException(`Task with id: ${id} not found`);
    }
    return found;
  }

  async createTask(createTaskDto: CreateTaskDTO): Promise<Task> {
    const { title, description } = createTaskDto;
    const newTask: Task = await this.tasksRepository.save({
      id: uuidv4(),
      title: title,
      description: description,
      status: TaskStatus.OPEN,
      createdDate: new Date().toISOString(),
    });

    return newTask;
  }

  async getAllTasks(): Promise<Task[]> {
    const tasks = await this.tasksRepository.find();
    if (isEmpty(tasks)) {
      throw new NotFoundException(`Tasks empty`);
    }
    return tasks;
  }

  async getTasksWithFilters(filterDto: GetTasksFilterDTO): Promise<Task[]> {
    const { status, search } = filterDto;

    const _query: any = {};

    if (status) {
      _query.status = status;
    }

    console.log(_query);

    let tasks = await this.tasksRepository.find({ ..._query });

    if (search) {
      tasks = filter(tasks, (task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return true;
        }

        return false;
      });
    }
    return tasks;
  }

  async deleteTask(id: string): Promise<TaskStatus> {
    const task = await this.getTaskById(id);
    try {
      const updated = await this.tasksRepository.update(task._id, {
        status: TaskStatus.DELETED,
      });
      return TaskStatus.DELETED;
    } catch (error) {
      throw new NotImplementedException();
    }
  }

  async pruneTask(id: string): Promise<string> {
    const task = await this.getTaskById(id);
    try {
      const updated = await this.tasksRepository.remove(task);
      return 'Pruned';
    } catch (error) {
      throw new NotImplementedException();
    }
  }

  async updateTaskStatus(
    id: string,
    updateTaskStatusDTO: UpdateTaskStatusDTO,
  ): Promise<Task> {
    const task = await this.getTaskById(id);
    try {
      const updated = await this.tasksRepository.update(task._id, {
        ...updateTaskStatusDTO,
      });
      return task;
    } catch (error) {
      throw new NotImplementedException();
    }
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDTO): Promise<Task> {
    const task = await this.getTaskById(id);
    try {
      const updated = await this.tasksRepository.update(task._id, {
        ...updateTaskDto,
      });
      return task;
    } catch (error) {
      throw new NotImplementedException();
    }
  }
}
