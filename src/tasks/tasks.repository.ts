import { EntityRepository, MongoRepository } from 'typeorm';
import Task from './task.entity';

@EntityRepository(Task)
export class TasksRepository extends MongoRepository<Task> {}
