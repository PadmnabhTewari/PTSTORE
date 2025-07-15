import mongoose from 'mongoose';
import crypto from 'crypto';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: [true, 'Please provide a phone number'],
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [6, 'Password must be at least 6 characters long'],
  },
  image: {
    type: String,
    default: '/images/default-avatar.png',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  address: {
    street: String,
    city: String,
    state: String,
    pincode: String,
  },
  preferences: {
    language: {
      type: String,
      enum: ['en', 'hi', 'bn', 'ta'],
      default: 'en',
    },
    notifications: {
      type: Boolean,
      default: true,
    },
  },
  orders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
  }],
  cart: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
    quantity: {
      type: Number,
      default: 1,
    },
  }],
});

// Add timestamps
userSchema.set('timestamps', true);

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const salt = crypto.randomBytes(16).toString('hex');
    this.password = crypto.pbkdf2Sync(this.password, salt, 1000, 64, 'sha512').toString('hex') + ':' + salt;
    next();
  } catch (error: any) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = function(candidatePassword: string): boolean {
  const [hash, salt] = this.password.split(':');
  const hashVerify = crypto.pbkdf2Sync(candidatePassword, salt, 1000, 64, 'sha512').toString('hex');
  return hash === hashVerify;
};

// Don't return password in queries
userSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    delete ret.password;
    return ret;
  },
});

export const User = mongoose.models.User || mongoose.model('User', userSchema); 