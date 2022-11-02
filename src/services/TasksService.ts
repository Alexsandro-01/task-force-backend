import Tasks from '../database/models/Tasks';
import Users from '../database/models/Users';
import { ITaskService } from '../interfaces/ITasksService';
import { 
  CreateTaskZodSchema,
  UpdatetaskZodSchema,
  IUpdateTask,
  ICreateTask
} from '../interfaces/ITasks';
import ValidationError from '../errors/ValidationError';
import { veryfyToken } from '../utils/jwt';

class TaskService implements ITaskService {
  private invalidTokenMessage = 'Empyt or invalid token';

  async create(payload: ICreateTask, bearerToken: string): Promise<void> {

    const parsedtask = CreateTaskZodSchema.safeParse(payload);

    if (!parsedtask.success) {
      throw parsedtask.error;
    }
    
    const id = await this.validateUser(bearerToken);

    try {
      await Tasks.create({
        ...payload,
        userId: id as string
      });
    } catch (error) {
      ValidationError.InternalServerError();
    }
  }

  async updateTask(
    payload: IUpdateTask,
    bearerToken: string,
    id: string): Promise<string | undefined> {

    
    await this.validateUser(bearerToken);
    await this.validateTask(id, payload);

    try {
      const result = await Tasks.update(payload, { where: { id } });
      if (result[0] !== 0) {
        return 'All tasks have been updated';
      }
      return 'Nothing task was updated';
    } catch (error) {
      ValidationError.InternalServerError();
    }
    
    
  }

  async getUserById(id: string): Promise<Users | null | undefined> {
    try {
      const user = await Users.findOne({
        raw: true,
        where: { id },
        attributes: ['id']
      });

      return user;
    } catch (error) {
     ValidationError.InternalServerError();
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

  async validateUser(bearerToken: string): Promise<string> {
    const token = this.checkToken(bearerToken);  
    const data = await veryfyToken(token);
    const user = await this.getUserById(data?.key as string);

    if (!user) {
      ValidationError.Unauthorized(this.invalidTokenMessage);
    }

    return data?.key as string;
  }

  async validateTask(id: string, payload: IUpdateTask): Promise<void> {
    // https://eslint.org/docs/latest/rules/no-prototype-builtins
    if (
      !Object.prototype.hasOwnProperty.call(payload, 'task') &&
      !Object.prototype.hasOwnProperty.call(payload, 'active')
    ) {
    ValidationError.BadRequest('Task or Active are required');
    }

    const parsedUpdate = UpdatetaskZodSchema.safeParse(payload);

    if (!parsedUpdate.success) {
      throw parsedUpdate.error;
    }

    const exist = await Tasks.findOne({
      where: { id }
    });

    if (!exist) {
      ValidationError.NotFoundError(`Task with id ${id} not found.`);
    }
  }
}

export default TaskService;