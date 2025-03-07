'use client'
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../lib/AuthContext';
import { useRouter } from 'next/navigation';

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user, router]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError(null);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!file) {
      setError('Please select a file');
      return;
    }

    setUploading(true);
    setError(null);

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

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      setUploadedUrl(data.url);
      setFile(null);
    } catch (error) {
      console.error('Upload error:', error);
      setError('Failed to upload file');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-white">Upload File</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="file" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Select File
          </label>
          <div className="mt-1">
            <input
              type="file"
              id="file"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100
                dark:file:bg-blue-900 dark:file:text-blue-100
                dark:hover:file:bg-blue-800"
            />
          </div>
          {file && (
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Selected: {file.name}
            </p>
          )}
        </div>

        {error && (
          <div className="text-red-500 text-sm">
            {error}
          </div>
        )}

        {uploadedUrl && (
          <div className="p-4 bg-green-50 dark:bg-green-900 rounded-md">
            <p className="text-green-700 dark:text-green-100">
              File uploaded successfully!
            </p>
            <p className="text-sm text-green-600 dark:text-green-200 mt-1">
              URL: {uploadedUrl}
            </p>
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!file || uploading}
            className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              (!file || uploading) ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
      </form>
    </div>
  );
}
