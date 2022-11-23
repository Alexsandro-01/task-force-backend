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

  update = async (req: Request, res: Response): Promise<void> => {
    const task = req.body;
    const { id } = req.params;
    const bearerToken = req.headers.authorization;

    const response = await this._service.updateTask(task, bearerToken, id as string);
    res.status(204).json(response);
  };

  getTasks = async (req: Request, res: Response): Promise<void> => {
    const bearerToken = req.headers.authorization;

    const response = await this._service.getTasks(bearerToken as string);
    res.status(200).json(response);
  };
}

export default TaskController;