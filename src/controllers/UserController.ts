import { Request, Response } from 'express';
import { IUser } from '../interfaces/IUser';
import { IUserService } from '../interfaces/IUserService';

class UserController {
  private _service;
  constructor(service: IUserService) {
    this._service = service;
  }

  login = async (req: Request, res: Response): Promise<void> => {
    const userData: IUser = req.body;
    const response = await this._service.login(userData);
    res.status(200).json(response);
  };
}

export default UserController;