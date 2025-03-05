import { Post } from '../lib/types';
import { JSX } from 'react';

export default function AuthorAvatar({ post }: { post: Post }): JSX.Element {
  return (
      <img
        className="h-8 w-8 rounded-full"
        src={`${post.author?.image?.img_url}`}
        alt={post.title}
      />
  );
}
