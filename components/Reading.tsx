"use client"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"

interface Book {
  title: string
  coverImage: string
  author?: string
  reading: boolean
}

export default function Reading({ reading }: { reading: boolean }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [books, setBooks] = useState<Book[]>([])



  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch("/api/books")
      const data = await response.json()

      const filteredBooks = data.filter((book: Book) => book.reading === reading)
      setBooks(filteredBooks)
    }
    fetchBooks()
  }, [])

  const nextBook = () => {
    setCurrentIndex((prev) => (prev + 1) % books.length)
  }

  const prevBook = () => {
    setCurrentIndex((prev) => (prev - 1 + books.length) % books.length)
  }

  return (
      <div className="relative w-full h-9/10 overflow-hidden rounded-lg border border-slate-700 bg-gradient-to-b from-slate-800 to-slate-900 p-4 shadow-sm flex flex-col mb-4">
        <h2 className="mb-4 text-center text-lg font-semibold text-slate-200 text-teal-200 underline">
          {reading ? "What I'm currently reading!" : "What I've read!"}
        </h2>
          <div className="flex flex-col items-center gap-5 flex-1 justify-center relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
              <button 
                onClick={prevBook}
                className="p-2 rounded-full bg-slate-700 hover:bg-slate-600 transition-colors"
                aria-label="Previous book"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </div>

            <div className="relative aspect-[2/3] w-full max-w-[240px] overflow-hidden rounded-md shadow-md transition-transform duration-300 hover:scale-105">
              <Image
                src={books[currentIndex]?.coverImage || "https://i.imgur.com/V0O1N8K.png"}
                alt={`Cover of ${books[currentIndex]?.title}`}
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
              <button 
                onClick={nextBook}
                className="p-2 rounded-full bg-slate-700 hover:bg-slate-600 transition-colors"
                aria-label="Next book"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <div className="text-center">
              <h3 className="font-semibold text-slate-200">{books[currentIndex]?.title}</h3>  
              {books[currentIndex]?.author && (
                <p className="mt-1 text-sm text-slate-400">by {books[currentIndex]?.author}</p>
              )}
            </div>

          {reading && (
            <div className="text-center">
              <p className="mt-1 text-sm text-slate-400">
                <Link href="https://fable.co/joshua-miller-210578073027?referralID=bAVxnz8OMk" target="_blank" className="text-teal-200 underline">
                  My Fable Account
                </Link>
              </p>
            </div>
          )}
          
        </div>
      </div>
  ) 
}

