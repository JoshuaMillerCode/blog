import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '../../../lib/mongodb';
import Post from '../../../models/Post';

export async function GET(req: NextRequest) {
  await connectToDatabase();

  try {
    const posts = await Post.find({});
    return NextResponse.json(posts);
  } catch (err) {
    return NextResponse.json(err);
  }
}

export async function POST(req: NextRequest) {
  await connectToDatabase();

  try {
    const body = await req.json();

    const { title, content, imgUrl, teaser, categories } = body;

    // set slug and published_date here

    // Maybe plug in some AI things here
    const post = await Post.create(body);

    return NextResponse.json(post);
  } catch (err) {
    return NextResponse.json(err);
  }
}
