import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { User } from '@/models/User';

export async function POST(req: Request) {
  try {
    const { name, email, phone, password } = await req.json();

    // Validate input
    if (!name || !email || !phone || !password) {
      return NextResponse.json(
        { message: 'Please provide all required fields' },
        { status: 400 }
      );
    }

    // Connect to database
    await connectToDatabase();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: 'User with this email already exists' },
        { status: 400 }
      );
    }

    // Create user (password will be hashed by the pre-save hook)
    const user = await User.create({
      name,
      email,
      phone,
      password,
      createdAt: new Date(),
    });

    // Remove password from response safely
    let userObj = {};
    if (typeof user.toObject === 'function') {
      userObj = user.toObject();
    } else {
      userObj = { ...user };
    }
    if ('password' in userObj) delete userObj.password;

    return NextResponse.json(
      {
        message: 'User created successfully',
        user: userObj,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { message: 'An error occurred during signup' },
      { status: 500 }
    );
  }
} 