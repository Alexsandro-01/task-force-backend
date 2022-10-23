import fs from 'fs/promises';
import ValidationError from '../errors/ValidationError';
import jwt from 'jsonwebtoken';
import { tokenData } from '../interfaces/IUser';

const key = 'jwt.key';

export async function makeToken(payload: { key: string }): Promise<string> {
  const secret = await fs.readFile(key, 'utf-8');
  const token = jwt.sign(payload, secret);
  
  return token;
}

export async function veryfyToken(token: string): Promise<tokenData | undefined> {
  const secret = await fs.readFile(key, 'utf-8');
  try {
    const data: any = jwt.verify(token, secret);
    return data as tokenData;

  } catch (error) {
    ValidationError.Unauthorized('Empyt or invalid token');
  }
}

