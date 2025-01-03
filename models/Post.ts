import { Schema, model } from 'mongoose';

const postSchema = new Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  metadata: {
    published_date: { type: String, required: true },
    content: { type: String, required: true },
    hero: {
      imgix_url: { type: String },
    },
    author: {
      id: { type: String, required: true },
      slug: { type: String, default: 'youravgdev' },
      title: { type: String, default: 'YourAverageDev' },
      metadata: {
        image: {
          imgix_url: { type: String },
        },
      },
    },
    teaser: { type: String, required: true },
    categories: [
      {
        title: { type: String, required: true },
      },
    ],
  },
});

export default model('Post', postSchema);
