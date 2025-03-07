import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Clean up filename
    const originalName = file.name
      .replace(/[^a-zA-Z0-9.-]/g, '_') // Replace special chars with underscore
      .toLowerCase(); // Convert to lowercase
    const filename = originalName;

    // Convert file to buffer
    const bytes2 = await file.arrayBuffer();
    const buffer = Buffer.from(bytes2);

    // Ensure uploads directory exists
    const uploadsDir = join(process.cwd(), 'uploads');
    await writeFile(join(uploadsDir, filename), buffer);

    // Return the URL for the uploaded file
    return NextResponse.json({
      url: `/api/uploads/${filename}`,
      filename,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Error uploading file' },
      { status: 500 }
    );
  }
}
