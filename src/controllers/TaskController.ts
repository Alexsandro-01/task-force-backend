import { Request, Response } from 'express';
import { ITaskService } from '../interfaces/ITasksService';


class TaskController {
  private _service;
  constructor(service: ITaskService) {
    this._service = service;
  }

  create = async (req: Request, res: Response): Promise<void> => {
    const task = req.body;
    const bearerToken = req.headers.authorization;

    const response = await this._service.create(task, bearerToken as string);
    res.status(201).json(response);
  };
}

export default TaskController;