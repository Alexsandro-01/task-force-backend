import fs from 'fs';
import jwt from 'jsonwebtoken';

const key = 'jwt.key';

function makeToken(payload: { key: string }): string {
  const secret = fs.readFileSync(key, 'utf-8');
  const token = jwt.sign(payload, secret);

  return token;
}

export default makeToken;