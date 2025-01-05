'use client';
import PostCard from '../components/PostCard';
import { useEffect, useState } from 'react';
import { Post } from '../lib/types';

export function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function getPosts() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`);
      const data = await response.json();
      setPosts(data);
    }

    getPosts()
  }, []);
  
  return (
    <>
      {/* <h1 className="my-4 text-4xl font-bold leading-tight tracking-tight text-zinc-700 dark:text-zinc-300">
        Posts by Your Average Developer
      </h1> */}

      {!posts && 'You must add at least one Post to your Bucket'}
      {posts &&
        posts.map((post) => {
          return (
            <div key={post._id}>
              <PostCard post={post} />
            </div>
          );
        })}
    </>
  );
}
