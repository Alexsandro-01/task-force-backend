/* eslint-disable @typescript-eslint/ban-types */
import { ILogin, ILogedUser, IUser, LoginZodSchema } from '../interfaces/IUser';
import { IUserService } from '../interfaces/IUserService';
import userModel from '../database/models/Users';
import Validate from '../validations/Validate';
import ValidationError from '../errors/ValidationError';
import makeToken from '../utils/jwt';

class UserService implements IUserService {
  async create(_payload: IUser): Promise<userModel> {
    const response = await userModel.create(_payload as {});
    return response;
  }

  async login(_payload: ILogin): Promise<ILogedUser> {
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
    const token = makeToken({
      key: response?.id as string,
    });

    return {
      name: response?.name as string,
      token,
    };
  }
}

export default UserService;