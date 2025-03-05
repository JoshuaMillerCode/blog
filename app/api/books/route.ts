import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '../../../lib/mongodb';
import Book from '../../../models/Book';

export async function GET(req: NextRequest) {
  await connectToDatabase();

  try {
    const books = await Book.find({});
    return NextResponse.json(books);
  } catch (err) {
    return NextResponse.json(err);
  }
}

export async function POST(req: NextRequest) {
  await connectToDatabase();

  try {
    const body = await req.json();

    const book = await Book.create(body);
    return NextResponse.json(book, { status: 201 });
  } catch (err) {
    return NextResponse.json(err);
  }
}
