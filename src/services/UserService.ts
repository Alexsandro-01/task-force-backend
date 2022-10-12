/* eslint-disable @typescript-eslint/ban-types */
import { ILogin, IUser, LoginZodSchema } from '../interfaces/IUser';
import { IUserService } from '../interfaces/IUserService';
import userModel from '../database/models/Users';
import Validate from '../validations/Validate';
import ValidationError from '../errors/ValidationError';

class UserService implements IUserService {
  async create(_payload: IUser): Promise<userModel> {
    const response = await userModel.create(_payload as {});
    return response;
  }

  async login(_payload: ILogin): Promise<userModel | null> {
    const parsedLoginData = LoginZodSchema.safeParse(_payload);

    if (!parsedLoginData.success) {
      throw parsedLoginData.error;
    }
    
    const response = await userModel.findOne({
      where: { email: _payload.email }
    });

    if (!response) {
      ValidationError.Unauthorized();
    }

    await Validate.password(_payload.password, response?.password as string);

    return response;
  }
}

export default UserService;