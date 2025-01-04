import jwt from 'jsonwebtoken';
import { Admin } from './types';

export function generateJWT({ username }: Admin) {
  return jwt.sign({ username: username }, process.env.JWT_SECRET as string, {
    expiresIn: '24h',
  });
}

export function verifyJWT(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET as string);
}
