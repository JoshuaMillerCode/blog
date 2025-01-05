import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '../../../../lib/mongodb';
import Post from '../../../../models/Post';

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  await connectToDatabase();

  try {
    const body = await req.json();
    const { slug } = await params;
    const post = await Post.findOneAndUpdate(
      {
        slug,
      },
      body,
      { new: true }
    );
    return NextResponse.json(post);
  } catch (err) {
    return NextResponse.json(err);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  await connectToDatabase();
  try {
    const { slug } = await params;
    await Post.findOneAndDelete({ slug });

    return NextResponse.json(`Post: ${slug} has been deleted`);
  } catch (err) {
    return NextResponse.json(err);
  }
}
