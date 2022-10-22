/* eslint-disable camelcase */
import { z } from 'zod';

export const LoginZodSchema = z.object({
  email: z.
  string({
    required_error: 'Email is required',
    invalid_type_error: 'Email must be a string',
  })
  .email({ message: 'Invalid email address' })
  .max(255),
  password: z
  .string({
    required_error: 'Password is required',
    invalid_type_error: 'Password must be a string',
  })
  .min(6, { message: 'Password must be 6 or more characters long' })
  .max(255),
});


export const UserZodSchema = z.object({
  name: z
  .string({
    required_error: 'Name is required',
    invalid_type_error: 'Name must be a string',
  })
  .min(3, { message: 'Name must be 3 or more characters long' })
  .max(255),
  email: z
  .string({
    required_error: 'Email is required',
    invalid_type_error: 'Email must be a string',
  })
  .email({ message: 'Invalid email address' }
  )
  .max(255),
  password: z
  .string({
    required_error: 'Password is required',
    invalid_type_error: 'Password must be a string',
  })
  .min(6, { message: 'Password must be 6 or more characters long' })
   .max(255),
});


export type ILogin = z.infer<typeof LoginZodSchema>;

export type IUser = z.infer<typeof UserZodSchema>;

export interface IFullUser extends IUser {
  id: string,
  created_at: Date,
}

export interface ILogedUser {
  name: string,
  token: string,
}

export interface tokenData {
  key: string
}