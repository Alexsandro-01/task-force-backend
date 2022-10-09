/* eslint-disable @typescript-eslint/ban-types */
import { ILogin, IUser } from '../interfaces/IUser';
import { IUserService } from '../interfaces/IUserService';
import userModel from '../database/models/Users';

class UserService implements IUserService {
  async create(_payload: IUser): Promise<userModel> {
    const response = await userModel.create(_payload as {});
    return response;
  }

  async login(_payload: ILogin): Promise<userModel | null> {
    const response = await userModel.findOne({
      where: { email: _payload.email }
    });

    return response;
  }
}

export default UserService;