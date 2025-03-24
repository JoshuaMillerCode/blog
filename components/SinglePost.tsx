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
import ThumbsUp from './ThumbsUp';
import 'prismjs/themes/prism-tomorrow.css';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-markdown';

export function SinglePost({ slug }: { slug: string }) {
  const [post, setPost] = useState<Post>();
  const [loading, setLoading] = useState(true);
  const [parsedContent, setParsedContent] = useState<React.ReactNode>(null);
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    async function getPost() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${slug}`);
      const data = await res.json();
      setPost(data);
      
      // Check if this post has been liked before
      const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');
      setLiked(likedPosts.includes(slug));
      
      setLoading(false);
    }

    getPost();
  }, [slug]);

  // Parse content in useEffect to avoid hydration mismatches
  useEffect(() => {
    if (post?.content) {
      setParsedContent(parse(post.content));
    }
  }, [post?.content]);

  useEffect(() => {
    if (typeof window !== 'undefined' && parsedContent) {
      // Small delay to ensure content is rendered
      setTimeout(() => {
        Prism.highlightAll();
      }, 0);
    }
  }, [parsedContent]);

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

  async function handleLike() {
    try {
      if (!post) return;
      
      // Get current liked posts from localStorage
      const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');
      
      // Update the likes count
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${slug}/like`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          likes: liked ? post.likes - 1 : post.likes + 1
        })
      });
      
      const postData = await res.json();

      if (res.ok) {
        setPost(postData);
        setLiked(!liked);
        
        // Update localStorage
        if (!liked) {
          // Add to liked posts
          localStorage.setItem('likedPosts', JSON.stringify([...likedPosts, slug]));
        } else {
          // Remove from liked posts
          localStorage.setItem('likedPosts', JSON.stringify(likedPosts.filter((s: string) => s !== slug)));
        }
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
                <div className="flex gap-6 justify-end align-center mb-4 ">
                  <ThumbsUp post={post} liked={liked} handleLike={handleLike} />
                </div>
                {
                  user && 
                  <div className="flex gap-2 mb-1">
                    <Link
                      href={`/posts/edit/${slug}`}
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Edit
                    </Link>
                    <button
                      className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      onClick={handleDelete}
                    >
                      Delete
                    </button>
                  </div>
                }
                <hr className="w-full border-t border-zinc-300 pb-8 dark:border-zinc-700" />
                <div className='text-zinc-500' data-post="yes" suppressHydrationWarning>
                  {parsedContent}
                </div>
                <div className="flex gap-6 justify-end align-center mb-4 ">
                  <ThumbsUp post={post} liked={liked} handleLike={handleLike} />
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
export const revalidate = 60;
