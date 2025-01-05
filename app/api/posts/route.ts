import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '../../../lib/mongodb';
import Post from '../../../models/Post';

export async function GET(req: NextRequest) {
  await connectToDatabase();
  return NextResponse.json('Hello World');
}

export async function POST(req: NextRequest) {
  await connectToDatabase();

  try {
    const body = await req.json();
    // Maybe plug in some AI things here
    const post = await Post.create(body);

    return NextResponse.json(post);
  } catch (err) {
    return NextResponse.json(err);
  }
}
