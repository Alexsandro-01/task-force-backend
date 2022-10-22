import Tasks from '../database/models/Tasks';
import Users from '../database/models/Users';
import { ICreateTask } from '../interfaces/ITasks';
import { ITaskService } from '../interfaces/ITasksService';
import ValidationError from '../errors/ValidationError';
import { veryfyToken } from '../utils/jwt';

class TaskService implements ITaskService {
  async create(payload: ICreateTask, bearerToken: string): Promise<void> {

    const token = this.checkToken(bearerToken);
    
    const data = await veryfyToken(token);

    try {
      await Tasks.create({
        ...payload,
        userId: data?.key as string
      });
    } catch (error) {
      ValidationError.internalServerError();
    }
  }

  async getUserById(id: string): Promise<Users | null | undefined> {
    try {
      const user = Users.findOne({
        raw: true,
        where: { id }
      });

      return user;
    } catch (error) {
     ValidationError.internalServerError();
    }
  }

  checkToken(bearerToken: string): string {
    if (!bearerToken) {
      ValidationError.Unauthorized('Token inválido ou ausente');
    }

    const [ , token] = bearerToken.split(' ');
    return token;
  }
}

export default TaskService;