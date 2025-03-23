'use client'
import { SinglePost } from '../../../components/SinglePost';
import React, { Suspense } from 'react';
import SinglePostSkeleton from '../../../components/SinglePostSkeleton';
import { useParams } from 'next/navigation';
import ErrorBoundary from '../../../components/ErrorBoundary';
import Link from 'next/link';

const PostErrorFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
        Unable to load post
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        We're having trouble loading this post. You can try refreshing the page or go back to the homepage.
      </p>
      <div className="flex space-x-4">
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors"
        >
          Refresh Page
        </button>
        <Link
          href="/"
          className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded transition-colors"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  </div>
);

export default () => {
  const { slug } = useParams<{ slug: string }>();
  return (
    <ErrorBoundary fallback={<PostErrorFallback />}>
      <Suspense fallback={<SinglePostSkeleton />}>
        <SinglePost slug={slug} />
      </Suspense>
    </ErrorBoundary>
  );
};

