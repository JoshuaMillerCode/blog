import Image from "next/image"

interface CurrentReadingProps {
  bookTitle: string
  coverImage: string
  author?: string
}

export function CurrentReading({
  bookTitle = "Atomic Habits",
  coverImage = "/placeholder.svg?height=300&width=200",
  author,
}: CurrentReadingProps) {
  return (
    <div className="sticky top-4 w-full h-9/10 overflow-hidden rounded-lg border border-blue-darker bg-gradient-to-b from-blue-darker to-[#072F5F] p-4 shadow-sm flex flex-col">
      <h2 className="mb-4 text-center text-lg font-medium text-blue-medium">
        What I'm currently reading
      </h2>

      <div className="flex flex-col items-center gap-5 flex-1 justify-center">
        <div className="relative aspect-[2/3] w-full max-w-[240px] overflow-hidden rounded-md shadow-md transition-transform duration-300 hover:scale-105">
          <Image
            src={coverImage || "/placeholder.svg"}
            alt={`Cover of ${bookTitle}`}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="text-center">
          <h3 className="font-semibold text-blue">{bookTitle}</h3>
          {author && <p className="mt-1 text-sm text-blue-medium">by {author}</p>}
        </div>
      </div>
    </div>
  )
}

