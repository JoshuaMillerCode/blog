'use client'
import React from 'react';
import Link from 'next/link';
import ArrowLeft from './icons/ArrowLeft';
import Tag from './Tag';
import AuthorAvatar from './AuthorAvatar';
import AuthorAttribution from './AuthorAttribution';
import parse from 'html-react-parser';
import { useState, useEffect } from 'react';
import { Post } from '../lib/types';
import SinglePostSkeleton from './SinglePostSkeleton';
import { useContext } from 'react';
import { AuthContext } from '../lib/AuthContext';
import { useRouter } from 'next/navigation';



export function SinglePost({ slug }: { slug: string }) {
  const [post, setPost] = useState<Post>();
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const router = useRouter();


  useEffect(()  => {
    async function getPost() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${slug}`);
      const data = await res.json();
      setPost(data);
      setLoading(false);
    }

    getPost();
  }, [slug])

  async function handleDelete() {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${slug}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (res.ok) {
        router.push('/');
      }
    } catch(err) {
      console.error(err);
    }
  }

  if (loading) {
    return <SinglePostSkeleton/>
  }
  
  return (
    <>
      {post && post.hero?.img_url && (
        <img
          width={1400}
          height={720}
          className="mb-5 h-[720px] w-full bg-no-repeat object-cover object-center"
          src={`${post.hero?.img_url}?w=1400&auto=format,compression`}
          alt={post.title}
        />
      )}
      <main className="mx-auto flex flex-col justify-center">
        <div className="mx-auto flex w-full flex-col items-start justify-center px-4 md:flex-row">
          <div className="mt-4 flex justify-start pb-4 md:justify-center md:pb-0 md:pr-20">
            <Link
              href="/"
              className="rounded-full border border-zinc-100 bg-white p-2 text-zinc-700 shadow-md dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </div>
          <div className="mr-20 flex w-full max-w-3xl flex-col justify-start md:w-3/4">
            <h2>
              {!post && <div className="text-center">Post Not found</div>}
              {post && post.title}
            </h2>
            {post && (
              <>
                <div className="flex flex-col justify-between space-y-4 pb-8 md:flex-row md:space-y-0">
                  <div className="flex items-center space-x-2 text-zinc-500 md:space-y-0 dark:text-zinc-400">
                    <AuthorAvatar post={post} />
                    <AuthorAttribution post={post} />
                  </div>
                  <div className="flex select-none justify-start space-x-2 md:justify-end">
                    {post.categories &&
                      post.categories.map((category) => (
                        <Tag key={category.title}>{category.title}</Tag>
                      ))}
                  </div>
                </div>
                {
                  user 
                  && 
                  <button
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 mb-1"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                }
                
                <hr className="w-full border-t border-zinc-300 pb-8 dark:border-zinc-700" />
                <div className='text-zinc-500'>{parse(post.content)}</div>
              </>
            )}
            {/* <div className="mx-auto mt-8 w-full">
              <hr className="w-full border-t border-zinc-300 pb-8 dark:border-zinc-700" />
              {suggestedPosts && (
                <div className="flex w-full flex-col">
                  <h3 className="pb-3 text-xl font-semibold text-zinc-800 dark:text-zinc-200">
                    Suggested Posts
                  </h3>
                  <div className="flex flex-col space-x-0 space-y-4 md:flex-row md:space-x-4 md:space-y-0">
                    {suggestedPosts
                      // .filter((nextPost) => nextPost?.id !== post?.id)
                      .slice(0, 2)
                      .map((post) => {
                        return <SuggestedPostCard key={post.id} post={post} />;
                      })}
                  </div>
                </div>
              )}
            </div> */}
          </div>
        </div>
      </main>
    </>
  );
}
export const revalidate = 60;
