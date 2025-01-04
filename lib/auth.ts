import { SignJWT, jwtVerify } from 'jose';
import { Admin } from './types';

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function generateJWT(user: Admin) {
  return new SignJWT({ id: user._id, username: user.username })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('24h')
    .sign(secret);
}

export async function verifyJWT(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    console.error('JWT verification failed:', error);
    throw new Error('Invalid token');
  }
}
