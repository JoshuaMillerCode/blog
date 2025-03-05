"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { AuthContext } from '../../lib/AuthContext';

interface Book {
  _id?: string;
  title: string;
  author: string;
  coverImage: string;
  reading: boolean;
}

export default function EditBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [formData, setFormData] = useState<Book>({
    title: '',
    author: '',
    coverImage: '',
    reading: true
  });
  const { user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/');
      return;
    }
    fetchBooks();
  }, [user]);

  const fetchBooks = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books`);
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingBook 
        ? `${process.env.NEXT_PUBLIC_API_URL}/books/${editingBook._id}`
        : `${process.env.NEXT_PUBLIC_API_URL}/books`;
      
      const method = editingBook ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setFormData({ title: '', author: '', coverImage: '', reading: true });
        setEditingBook(null);
        fetchBooks();
      }
    } catch (error) {
      console.error('Error saving book:', error);
    }
  };

  const handleEdit = (book: Book) => {
    setEditingBook(book);
    setFormData(book);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this book?')) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        fetchBooks();
      }
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-slate-200">Manage Books</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6 mb-8">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-slate-200">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            className="mt-1 block w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-200"
          />
        </div>

        <div>
          <label htmlFor="author" className="block text-sm font-medium text-slate-200">
            Author
          </label>
          <input
            id="author"
            type="text"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            required
            className="mt-1 block w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-200"
          />
        </div>

        <div>
          <label htmlFor="coverImage" className="block text-sm font-medium text-slate-200">
            Cover Image URL
          </label>
          <input
            id="coverImage"
            type="text"
            value={formData.coverImage}
            onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
            required
            className="mt-1 block w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-200"
          />
        </div>

        <div className="flex items-center">
          <input
            id="reading"
            type="checkbox"
            checked={formData.reading}
            onChange={(e) => setFormData({ ...formData, reading: e.target.checked })}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-700 rounded bg-slate-800"
          />
          <label htmlFor="reading" className="ml-2 block text-sm text-slate-200">
            Currently Reading
          </label>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {editingBook ? 'Update Book' : 'Add Book'}
          </button>
          {editingBook && (
            <button
              type="button"
              onClick={() => {
                setEditingBook(null);
                setFormData({ title: '', author: '', coverImage: '', reading: true });
              }}
              className="px-4 py-2 bg-slate-700 text-white rounded-md hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">Books List</h2>
        {books.map((book) => (
          <div key={book._id} className="flex items-center justify-between p-4 bg-slate-800 rounded-lg">
            <div>
              <h3 className="text-slate-200 font-medium">{book.title}</h3>
              <p className="text-slate-400 text-sm">by {book.author}</p>
              <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                book.reading ? 'bg-green-500/20 text-green-400' : 'bg-slate-500/20 text-slate-400'
              }`}>
                {book.reading ? 'Reading' : 'Not Reading'}
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(book)}
                className="p-2 text-blue-400 hover:text-blue-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </button>
              <button
                onClick={() => book._id && handleDelete(book._id)}
                className="p-2 text-red-400 hover:text-red-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
