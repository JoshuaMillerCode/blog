import { NextResponse, NextRequest } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';

type tParams = Promise<{ filename: string }>;

export async function GET(req: NextRequest, { params }: { params: tParams }) {
  try {
    const { filename } = await params;

    const file = await readFile(join(process.cwd(), 'uploads', filename));
    const extension = filename.split('.').pop();

    // Return the file with appropriate content type
    return new NextResponse(file, {
      headers: {
        'Content-Type': `image/${extension}`,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('File read error:', error);
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }
}
