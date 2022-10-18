import fs from 'fs/promises';
import jwt from 'jsonwebtoken';

const key = 'jwt.key';

async function makeToken(payload: { key: string }): Promise<string> {
  const secret = await fs.readFile(key, 'utf-8');
  const token = jwt.sign(payload, secret);

  return token;
}

export default makeToken;