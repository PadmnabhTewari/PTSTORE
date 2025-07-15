import { connectToDatabase } from '@/lib/mongodb';
import { User } from '@/models/User';

async function initializeDatabase() {
  try {
    // Connect to MongoDB
    await connectToDatabase();
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    console.log('Cleared existing users');

    // Create test user (password will be hashed by the pre-save hook)
    const testUser = await User.create({
      name: 'Test User',
      email: 'test@example.com',
      phone: '+91 1234567890',
      password: 'test123',
      address: {
        street: '123 Test Street',
        city: 'Kanpur',
        state: 'Uttar Pradesh',
        pincode: '208001'
      },
      preferences: {
        language: 'en',
        notifications: true
      }
    });

    console.log('Created test user:', testUser.email);
    console.log('Database initialized successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
}

initializeDatabase(); 