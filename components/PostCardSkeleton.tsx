const PostCardSkeleton = () => {
  return (
    <div className="mb-8 p-4 border border-gray-700 rounded-lg shadow-sm dark:border-gray-600 animate-pulse">
      <div className="mb-5 h-[400px] w-full bg-gray-600 rounded-xl dark:bg-gray-800"></div>
      <div className="pb-3 h-6 bg-gray-600 rounded dark:bg-gray-800 mb-1"></div>
      <div className="flex flex-col justify-between space-y-4 md:flex-row md:space-y-0 mb-1">
        <div className="flex items-center space-x-2 text-zinc-500 md:space-y-0 dark:text-zinc-400">
          <div className="h-10 w-10 bg-gray-600 rounded-full dark:bg-gray-800"></div>
          <div className="h-6 w-24 bg-gray-600 rounded dark:bg-gray-800"></div>
        </div>
        <div className="flex select-none justify-start space-x-2 md:hidden md:justify-end">
          <div className="h-6 w-16 bg-gray-600 rounded dark:bg-gray-800"></div>
          <div className="h-6 w-16 bg-gray-600 rounded dark:bg-gray-800"></div>
        </div>
      </div>
      
      <div className="py-6 h-24 bg-gray-600 rounded dark:bg-gray-800 mb-1 "></div>
      <div className="flex items-center justify-between">
        <div className="h-6 w-24 bg-gray-600 rounded dark:bg-gray-800"></div>
      </div>
    </div>
  );
};

export default PostCardSkeleton;