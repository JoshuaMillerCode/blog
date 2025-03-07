'use client'
import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../../lib/AuthContext';
import { useRouter } from 'next/navigation';
// import { Editable, useEditor } from '@wysimark/react';



const NewPostPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [img, setImg] = useState<File | null>(null);
  const [imgUrl, setImgUrl] = useState('');
  const [teaser, setTeaser] = useState('');
  const [categories, setCategories] = useState<Array<string>>(['']);
  const [uploading, setUploading] = useState(false);
  // Markdown
  // const [markdown, setMarkdown] = useState('# Let\'s write!')
  // const editor = useEditor({ 
  //   authToken: process.env.WYSIMARK_AUTH_TOKEN,
  //   height: '500px'
  // });

  const { user } = useContext(AuthContext);

  const router = useRouter();

  useEffect(() => {
    // restrict page from reg users
    if (!user) {
      router.push('/');
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const postData = { 
      title, 
      content, 
      imgUrl: imgUrl, 
      teaser, 
      categories: categories.map((cat) => { 
        return { title: cat };
      }) 
    };
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(postData),
    });

    if (res.ok) {
      router.push('/');
    }
  };

  const handleCategoryChange = (index: number, value: string) => {
    const newCategories = [...categories];
    newCategories[index] = value;
    setCategories(newCategories);
  };

  const addCategory = () => {
    setCategories([...categories, '']);
  };

  const removeCategory = (index: number) => {
    const newCategories = categories.filter((_, i) => i !== index);
    setCategories(newCategories);
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImg(file);
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        setImgUrl(data.url);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-white">Create a New Post</h1>
      <form onSubmit={handleSubmit} className= "space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          />
        </div>
        {/* use react markdown to render */}
        {/* <Editable editor={editor} value={markdown} onChange={setMarkdown}/> */}
      
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          />
        </div>

        <div>
          <label htmlFor="imgUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Image
          </label>
          <div className="mt-1 flex items-center gap-4">
            <input
              type="text"
              id="imgUrl"
              value={imgUrl}
              onChange={(e) => setImgUrl(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
            <div className="relative">
              <input
                type="file"
                id="image-upload"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <label
                htmlFor="image-upload"
                className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer ${
                  uploading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {uploading ? 'Uploading...' : 'Upload'}
              </label>
            </div>
          </div>
          {imgUrl && (
            <div className="mt-2">
              <img
                src={imgUrl}
                alt="Preview"
                className="max-h-40 rounded-md object-contain"
              />
            </div>
          )}
        </div>

        <div>
          <label htmlFor="teaser" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Teaser
          </label>
          <textarea
            id="teaser"
            value={teaser}
            onChange={(e) => setTeaser(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Categories
          </label>
          {categories.map((category, index) => (
            <div key={index} className="flex items-center mt-1">
              <input
                type="text"
                value={category}
                onChange={(e) => handleCategoryChange(index, e.target.value)}
                required
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              />
              <button
                type="button"
                onClick={() => removeCategory(index)}
                className="ml-2 text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addCategory}
            className="mt-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Category
          </button>
        </div>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewPostPage;