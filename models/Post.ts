import { Schema, model, models } from 'mongoose';

const postSchema = new Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  published_date: { type: String, required: true },
  content: { type: String, required: true },
  hero: {
    img_url: { type: String },
  },
  author: {
    slug: { type: String, default: 'youravgdev' },
    title: { type: String, default: 'YourAverageDev' },
    image: {
      // put default img here
      img_url: { type: String },
    },
  },
  teaser: { type: String, required: true },
  categories: [
    {
      title: { type: String },
    },
  ],
});

export default models.Post || model('Post', postSchema);
