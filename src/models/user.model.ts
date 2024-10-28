import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ['readers', 'creators', 'admin'],
      default: 'readers',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('User', userSchema);

