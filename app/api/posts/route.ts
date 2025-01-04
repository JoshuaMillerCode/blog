import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '../../../lib/mongodb';
import Post from '../../../models/Post';

export async function GET(req: NextRequest) {
  await connectToDatabase();
  return NextResponse.json('Hello World');
}

export async function POST(req: NextRequest) {
  await connectToDatabase();

  console.log(await req.json());

  return NextResponse.json('created');
}
