import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '../../../../lib/mongodb';
import Book from '../../../../models/Book';

type tParams = Promise<{ id: string }>;

export async function GET(req: NextRequest, { params }: { params: tParams }) {
  await connectToDatabase();

  const { id } = await params;

  try {
    const book = await Book.findById(id);
    if (!book) {
      return NextResponse.json({ message: 'Book not found' }, { status: 404 });
    }
    return NextResponse.json(book);
  } catch (err) {
    return NextResponse.json(err);
  }
}

export async function PUT(req: NextRequest, { params }: { params: tParams }) {
  await connectToDatabase();

  const { id } = await params;

  try {
    const body = await req.json();
    console.log(body);
    const book = await Book.findByIdAndUpdate(id, body, {
      new: true,
    });
    if (!book) {
      return NextResponse.json({ message: 'Book not found' }, { status: 404 });
    }
    return NextResponse.json(book);
  } catch (err) {
    return NextResponse.json(err);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: tParams }
) {
  await connectToDatabase();

  const { id } = await params;

  try {
    const book = await Book.findByIdAndDelete(id);
    if (!book) {
      return NextResponse.json({ message: 'Book not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Book deleted successfully' });
  } catch (err) {
    return NextResponse.json(err);
  }
}
