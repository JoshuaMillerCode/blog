import { Schema, model, models } from 'mongoose';

const bookSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    coverImage: { type: String, required: true },
    reading: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

export default models.Book || model('Book', bookSchema);
