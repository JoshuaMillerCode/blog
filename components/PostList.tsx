'use client';
import PostCard from '../components/PostCard';
import { useEffect, useState } from 'react';
import { Post } from '../lib/types';
import PostCardSkeleton from './PostCardSkeleton';

export function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getPosts() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`);
      const data = await response.json();
      setPosts(data);

      console.log(data.reverse())

      setLoading(false);
    }

    getPosts()
  }, []);
  
  return (
    <>
      {loading && 
        <>
          <PostCardSkeleton />
          <PostCardSkeleton />
          <PostCardSkeleton />
        </>
      }

      {!posts && 'No Posts'}
      {posts && !loading &&
        posts.reverse().map((post) => {
          return (
            <div key={post._id}>
              <PostCard post={post} />
            </div>
          );
        })}
    </>
  );
}
