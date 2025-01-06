import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '../../../lib/mongodb';
import Admin from '../../../models/Admin';
import { generateJWT } from '../../../lib/auth';
import bcrypt from 'bcrypt';

export async function GET(req: NextRequest) {
  return NextResponse.json('Login route');
}

export async function POST(req: NextRequest) {
  await connectToDatabase();

  try {
    const { username, password } = await req.json();
    // Find the user by username
    const user = await Admin.findOne({ username });
    if (!user) {
      return NextResponse.json({ error: 'Invalid username' }, { status: 401 });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      );
    }

    // Generate a JWT token
    const token = await generateJWT(user);

    // Return the token and user info
    return NextResponse.json(
      { token, user: { username: user.username } },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
