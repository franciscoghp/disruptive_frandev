import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema(
  {
    name_theme: {
      type: [mongoose.Schema.name],
      required: true,
      ref: 'category',
    },
    url_image: {
      type: String,
      required: false,
      trim: true,
    },
    url_video: {
      type: String,
      required: false,
      trim: true,
    },
    content_text: {
      type: String,
      required: false,
      trim: true,
    },
    credits: {
      type: String,
      required: false,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('content', contentSchema);

