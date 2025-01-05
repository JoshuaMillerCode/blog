import { SinglePost } from '../../../components/SinglePost';
import { Suspense } from 'react';
import { Loader } from '../../../components/Loader';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;

  // console.log(slug)

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
    <Suspense fallback={<Loader />}>
      <SinglePost slug={slug} />;
    </Suspense>
  );
};
export const revalidate = 60;
