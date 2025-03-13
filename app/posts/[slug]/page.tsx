'use client'
import { SinglePost } from '../../../components/SinglePost';
import React, { Suspense } from 'react';
import SinglePostSkeleton from '../../../components/SinglePostSkeleton';
import { useParams } from 'next/navigation'


export default () => {
  const { slug } = useParams<{ slug: string }>();
  return (
    <Suspense fallback={<SinglePostSkeleton />}>
      <SinglePost slug={slug} />;
    </Suspense>
  );
};

