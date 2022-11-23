import { ICreateTask, IUpdateTask, Itask } from './ITasks';
import Users from '../database/models/Users';

export interface ITaskService {
  create(_payload: ICreateTask, _bearerToken: string): Promise<void>,
  updateTask(
    _payload: IUpdateTask,
    _bearerToken: string | undefined,
    _id: string): Promise<string | undefined>,
  getTasks(_bearerToken: string): Promise<Itask[] | undefined>
  getUserById(_id: string): Promise<Users | null | undefined>,
  checkToken(_bearerToken: string): string
}