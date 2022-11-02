/* eslint-disable camelcase */
import { z } from 'zod';

export const CreateTaskZodSchema = z.object({
  task: z.
  string({
    required_error: 'Task is required',
    invalid_type_error: 'Task must be a string',
  })
  .min(1, { message: 'Task must be 1 or more characters' })
  .max(255, { message: 'Task need to be smaller than 255 characters'}),
  active: z.boolean({
    required_error: 'Active is required',
    invalid_type_error: 'Active must be a boolean'
  })
});

export const UpdatetaskZodSchema = z.object({
  task: z.
  string({
    required_error: 'Task is required',
    invalid_type_error: 'Task must be a string',
  })
  .min(1, { message: 'Task must be 1 or more characters' })
  .max(255, { message: 'Task need to be smaller than 255 characters'})
  .optional(),
  active: z.boolean({
    required_error: 'Active is required',
    invalid_type_error: 'Active must be a boolean'
  })
  .optional()
});

export type ICreateTask = z.infer<typeof CreateTaskZodSchema>
export type IUpdateTask = z.infer<typeof UpdatetaskZodSchema>
