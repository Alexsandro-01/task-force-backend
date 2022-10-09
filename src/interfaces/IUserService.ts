import { ILogin, IUser } from './IUser';
import userModel from '../database/models/Users';

export interface IUserService {
  create(_payload: IUser): Promise<userModel>,
  login(_payload: ILogin): Promise<userModel | null>,
}