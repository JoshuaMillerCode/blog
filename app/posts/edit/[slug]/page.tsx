"use client"
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useContext } from 'react';
import { AuthContext } from '../../../../lib/AuthContext';
import { Post } from '../../../../lib/types';
import Link from 'next/link';
import ArrowLeft from '../../../../components/icons/ArrowLeft';

export default function EditPost() {
  const params = useParams()
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    published_date: '',
    content: '',
    hero: {
      img_url: '',
    },
    author: {
      slug: '',
      title: '',
      image: {
        img_url: '',
      },
    },
    teaser: '',
    categories: [{ title: '' }],
  });
  const { user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/');
      return;
    }
    fetchPost();
  }, [user, params.slug]);

  const fetchPost = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${params.slug}`);
      const data = await response.json();
      setPost(data);
      setFormData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching post:', error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${params.slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        router.push(`/posts/${params.slug}`);
      }
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const handleCategoryChange = (index: number, value: string) => {
    const newCategories = [...formData.categories];
    newCategories[index] = { title: value };
    setFormData({ ...formData, categories: newCategories });
  };

  const addCategory = () => {
    setFormData({
      ...formData,
      categories: [...formData.categories, { title: '' }]
    });
  };

  const removeCategory = (index: number) => {
    const newCategories = formData.categories.filter((_, i) => i !== index);
    setFormData({ ...formData, categories: newCategories });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex items-center mb-6">
        <Link
          href={`/posts/${params.slug}`}
          className="rounded-full border border-zinc-100 bg-white p-2 text-zinc-700 shadow-md dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <h1 className="text-2xl text-white font-bold ml-4">Edit Post</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-slate-200">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            className="mt-1 block w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-200"
          />
        </div>

        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-slate-200">
            Slug
          </label>
          <input
            type="text"
            id="slug"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            required
            className="mt-1 block w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-200"
          />
        </div>

        <div>
          <label htmlFor="published_date" className="block text-sm font-medium text-slate-200">
            Published Date
          </label>
          <input
            type="date"
            id="published_date"
            value={formData.published_date}
            onChange={(e) => setFormData({ ...formData, published_date: e.target.value })}
            required
            className="mt-1 block w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-200"
          />
        </div>

        <div>
          <label htmlFor="hero_img_url" className="block text-sm font-medium text-slate-200">
            Hero Image URL
          </label>
          <input
            type="text"
            id="hero_img_url"
            value={formData.hero.img_url}
            onChange={(e) => setFormData({ 
              ...formData, 
              hero: { ...formData.hero, img_url: e.target.value }
            })}
            required
            className="mt-1 block w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-200"
          />
        </div>

        <div>
          <label htmlFor="teaser" className="block text-sm font-medium text-slate-200">
            Teaser
          </label>
          <textarea
            id="teaser"
            value={formData.teaser}
            onChange={(e) => setFormData({ ...formData, teaser: e.target.value })}
            required
            rows={3}
            className="mt-1 block w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-200"
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-slate-200">
            Content
          </label>
          <textarea
            id="content"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            required
            rows={10}
            className="mt-1 block w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-200 mb-2">
            Categories
          </label>
          {formData.categories.map((category, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={category.title}
                onChange={(e) => handleCategoryChange(index, e.target.value)}
                className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-200"
                placeholder="Category title"
              />
              <button
                type="button"
                onClick={() => removeCategory(index)}
                className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addCategory}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add Category
          </button>
        </div>

        <div className="flex justify-end gap-4">
          <Link
            href={`/posts/${params.slug}`}
            className="px-4 py-2 bg-slate-700 text-white rounded-md hover:bg-slate-600"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
} 