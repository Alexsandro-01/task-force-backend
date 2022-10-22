import { ICreateTask } from './ITasks';
import Users from '../database/models/Users';

export interface ITaskService {
  create(_payload: ICreateTask, _bearerToken: string): Promise<void>,
  getUserById(_id: string): Promise<Users | null | undefined>,
  checkToken(_bearerToken: string): string
}