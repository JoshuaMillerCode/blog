import { SinglePost } from '../../../components/SinglePost';
import { Suspense } from 'react';
import SinglePostSkeleton from '../../../components/SinglePostSkeleton';
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;

  // const post = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/` + slug).then((res) => res.json());

  // return {
  //   title: `${post.title} | YourAverageDev`,
  // };

  return {
    title: `YourAverageDev Blog`,
  };
}

export default async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;
  console.log(slug)
  return (
    <Suspense fallback={<SinglePostSkeleton />}>
      <SinglePost slug={slug} />;
    </Suspense>
  );
};
export const revalidate = 60;
