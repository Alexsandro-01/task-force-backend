import Tasks from '../database/models/Tasks';
import Users from '../database/models/Users';
import { ICreateTask } from '../interfaces/ITasks';
import { ITaskService } from '../interfaces/ITasksService';
import { CreateTaskZodSchema } from '../interfaces/ITasks';
import ValidationError from '../errors/ValidationError';
import { veryfyToken } from '../utils/jwt';

class TaskService implements ITaskService {
  private invalidTokenMessage = 'Empyt or invalid token';

  async create(payload: ICreateTask, bearerToken: string): Promise<void> {

    const parsedtask = CreateTaskZodSchema.safeParse(payload);

    if (!parsedtask.success) {
      throw parsedtask.error;
    }
    
    const token = this.checkToken(bearerToken);
    
    const data = await veryfyToken(token);

    const user = await this.getUserById(data?.key as string);

    if (user?.id !== data?.key) {
      ValidationError.Unauthorized(this.invalidTokenMessage);
    }

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
      const user = await Users.findOne({
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
      ValidationError.Unauthorized(this.invalidTokenMessage);
    }
    
    const [ , token] = bearerToken.split(' ');
    
    if (!token) {
      ValidationError.Unauthorized(this.invalidTokenMessage);
    }

    return token;
  }
}

export default TaskService;