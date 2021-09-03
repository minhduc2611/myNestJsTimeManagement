// eslint-disable-next-line prettier/prettier
import { BaseEntity, Column, Entity, ObjectID, ObjectIdColumn, PrimaryColumn } from 'typeorm';
import { TaskStatus } from './task-status.enum';

@Entity()
export default class Task extends BaseEntity {
  @ObjectIdColumn()
  _id: ObjectID;

  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;

  @Column()
  createdDate: Date;
}
