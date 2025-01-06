const SinglePostSkeleton = () => {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-10 bg-gray-600 rounded dark:bg-gray-800"></div>
      <div className="h-6 bg-gray-600 rounded dark:bg-gray-800"></div>
      <div className="h-6 bg-gray-600 rounded dark:bg-gray-800"></div>
      <div className="h-[400px] w-full bg-gray-600 rounded-xl dark:bg-gray-800"></div>
      <div className="h-6 bg-gray-600 rounded dark:bg-gray-800"></div>
      <div className="h-6 bg-gray-600 rounded dark:bg-gray-800"></div>
      <div className="h-6 bg-gray-600 rounded dark:bg-gray-800"></div>
      <div className="h-6 bg-gray-600 rounded dark:bg-gray-800"></div>
    </div>
  );
};

export default SinglePostSkeleton;