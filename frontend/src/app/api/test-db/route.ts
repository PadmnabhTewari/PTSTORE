import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { User } from '@/models/User';

export async function GET() {
  try {
    await connectToDatabase();
    const users = await User.find().select('-password');
    return NextResponse.json({ 
      message: 'Database connected successfully',
      users 
    });
  } catch (error: any) {
    return NextResponse.json({ 
      error: 'Database connection failed',
      details: error.message 
    }, { status: 500 });
  }
} 