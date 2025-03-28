import { NextRequest, NextResponse } from 'next/server';
import { verifyJWT } from './lib/auth';

const PROTECTED_METHODS = ['POST', 'PUT', 'DELETE'];

export async function middleware(req: NextRequest) {
  console.log('method:', req.method);

  // Skip authentication for like endpoint
  if (req.nextUrl.pathname.endsWith('/like')) {
    return NextResponse.next();
  }

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
      await verifyJWT(token);
      return NextResponse.next();
    } catch (error) {
      console.error('Error verifying token');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  // Allow GET requests to proceed without authentication
  return NextResponse.next();
}

// Protected routes
export const config = {
  matcher: [
    '/api/posts/:path*',
    '/posts/new/:path*',
    '/api/books/:path*',
    '/edit-books/',
    '/api/upload',
    '/api/uploads/:path*',
  ],
};
