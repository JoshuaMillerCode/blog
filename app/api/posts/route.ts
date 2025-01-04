import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '../../../lib/mongodb';

export async function GET(req: NextRequest) {
  await connectToDatabase();
  return NextResponse.json('Hello World');
}
