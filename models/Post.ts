import { Schema, model, models } from 'mongoose';

const postSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    published_date: { type: String, required: true },
    content: { type: String, required: true },
    hero: {
      img_url: { type: String, default: 'https://i.imgur.com/nZdaBYq.png' },
    },
    author: {
      slug: { type: String, default: 'youravgdev' },
      title: { type: String, default: 'YourAverageDev' },
      image: {
        // put default img here
        img_url: { type: String, default: 'https://i.imgur.com/qM0Eh2B.jpeg' },
      },
    },
    teaser: { type: String, required: true },
    categories: [
      {
        title: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default models.Post || model('Post', postSchema);
