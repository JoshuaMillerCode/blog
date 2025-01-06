import React from 'react';
import { PostList } from '../components/PostList';
import PostCardSkeleton from '../components/PostCardSkeleton';
import { Suspense } from 'react';

export default function Page() {
  return (
    <main className="mx-auto mt-4 w-full max-w-3xl flex-col space-y-16 px-4 lg:px-0">
      <Suspense fallback={<PostCardSkeleton />}>
        <PostList />
      </Suspense>
    </main>
  );
}
export const revalidate = 60;
