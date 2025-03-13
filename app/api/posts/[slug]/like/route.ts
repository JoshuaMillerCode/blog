import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '../../../../../lib/mongodb';
import Post from '../../../../../models/Post';

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  await connectToDatabase();

  try {
    const { slug } = await params;
    const body = await req.json();
    const post = await Post.findOneAndUpdate(
      { slug },
      { likes: body.likes },
      { new: true }
    );
    return NextResponse.json(post);
  } catch (err) {
    return NextResponse.json(err);
  }
}
