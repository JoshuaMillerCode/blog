import { NextRequest, NextResponse } from 'next/server';
import { verifyJWT } from './lib/auth';

// I need a type for likes

const PROTECTED_METHODS = ['POST', 'PUT', 'DELETE'];

export async function middleware(req: NextRequest) {
  console.log('method:', req.method);
  // Check if the request method is POST
  if (PROTECTED_METHODS.includes(req.method)) {
    const authHeader = req.headers.get('Authorization');

    if (!authHeader) {
      return NextResponse.redirect(new URL('/', req.url));
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return NextResponse.redirect(new URL('/', req.url));
    }

    try {
      verifyJWT(token);
      console.log('Token is valid');
      return NextResponse.next();
    } catch (error) {
      console.error('Error verifying token:', error);
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  // Allow GET requests to proceed without authentication
  return NextResponse.next();
}

// Protected routes
export const config = {
  matcher: ['/api/posts/:path*'], // Apply middleware to the /api/posts route
};
