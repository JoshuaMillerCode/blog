import React from 'react';
import Link from 'next/link';
import helpers from '../helpers';
import { Post } from '../lib/types';

export default function PostCard({ post }: { post: Post }) {
  return (
    <div>
      {post.hero?.img_url && (
        <Link href={`/posts/${post.slug}`}>
          <img
            className="mb-5 h-[240px] rounded-xl bg-no-repeat object-cover object-center transition-transform duration-200 ease-out hover:scale-[1.02]"
            src={`${post.hero?.img_url}?w=1400&auto=format,compression`}
            alt={post.title}
          />
        </Link>
      )}
      <h2 className="pb-3 text-xl font-semibold text-zinc-800 dark:text-zinc-200">
        <Link href={`/posts/${post.slug}`}>{post.title}</Link>
      </h2>
      <div className="flex items-center space-x-2 text-zinc-500 dark:text-zinc-400">
        <Link href={`/author/${post.author?.slug}`}>
          <img
            className="h-8 w-8 rounded-full"
            src={`${post.author?.image?.img_url}?w=100&auto=format,compression`}
            alt={post.title}
          />
        </Link>
        <div>
          <span>
            by{' '}
            <a
              href={`/author/${post.author?.slug}`}
              className="font-semibold text-green-600 dark:text-green-200"
            >
              {post.author?.title}
            </a>{' '}
            on {helpers.stringToFriendlyDate(post.published_date)}
          </span>
        </div>
      </div>
    </div>
  );
}
