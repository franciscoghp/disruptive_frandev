import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    cover: {
      type: String,
      trim: true,
    },
    permissions: {
      type: [mongoose.Schema.name],
      required: true,
      ref: 'Permission',
    },  
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Category', categorySchema);

