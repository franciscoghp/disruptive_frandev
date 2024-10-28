import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('Database MongoDB connected succesfully');
  } catch (error) {
    console.log(error);
  }
};

