import { SinglePost } from '../../../components/SinglePost';
import { Suspense } from 'react';
import { Loader } from '../../../components/Loader';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;

  // const post = await fetch('/api/posts/' + slug).then((res) => res.json());

  return {
    title: `Your Average Developer Blog`,
  };
}

export default async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;
  return (
    <Suspense fallback={<Loader />}>
      <SinglePost slug={slug} />;
    </Suspense>
  );
};
export const revalidate = 60;
