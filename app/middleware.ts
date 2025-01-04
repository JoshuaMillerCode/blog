import { NextRequest, NextResponse } from 'next/server';
import { verifyJWT } from '../lib/auth';

export async function middleware(req: NextRequest) {
  console.log('method:', req.method);
  // Check if the request method is POST
  if (req.method === 'POST') {
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
      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  // Allow GET requests to proceed without authentication
  return NextResponse.next();
}

export const config = {
  matcher: ['/api/posts/:path*'], // Apply middleware to the /api/posts route
};
