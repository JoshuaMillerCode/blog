import React from 'react';
import { PostList } from '../components/PostList';
import PostCardSkeleton from '../components/PostCardSkeleton';
import { Suspense } from 'react';
import { CurrentReading } from '../components/CurrentReading';

export default function Page() {
  return (
    <div className="flex justify-center mt-4 w-full px-4 lg:px-4">
      <div className="flex justify-between gap-8">
        <main className="w-full max-w-3xl flex-col space-y-16">
          <Suspense fallback={<PostCardSkeleton />}>
            <PostList />
          </Suspense>
        </main>
        <aside className="hidden lg:block w-96">
          <CurrentReading />
        </aside>
      </div>
    </div>
  );
}
export const revalidate = 60;
