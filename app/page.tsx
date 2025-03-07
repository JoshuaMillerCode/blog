"use client"
import React, { useState, Suspense } from 'react';
import { PostList } from '../components/PostList';
import PostCardSkeleton from '../components/PostCardSkeleton';
import Reading from '../components/Reading';

export default function Page() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex justify-center mt-4 w-full px-4 lg:px-4">
      <div className="flex justify-between gap-8 relative">
        <main className="w-full max-w-3xl flex-col space-y-16">
          <Suspense fallback={<PostCardSkeleton />}>
            <PostList />
          </Suspense>
        </main>

        {/* Mobile Toggle Button */}
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="fixed top-14 md:top-4 right-4  lg:hidden z-50 p-3 rounded-full bg-slate-800 shadow-lg"
          aria-label="Toggle reading list"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </button>

        {/* Overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-80 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside className={`
          fixed lg:static inset-y-10 right-0 w-96 transform transition-transform duration-300 ease-in-out z-50
          ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
        `}>
          <div className="h-full overflow-y-auto">
            <Reading reading={true} />
            <Reading reading={false} />
          </div>
        </aside>
      </div>
    </div>
  );
}
