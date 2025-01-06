import { Post } from '../lib/types';
import helpers from '../helpers';

export default function AuthorAttribution({
  post,
}: {
  post: Post;
}): JSX.Element {
  return (
    <div className="flex space-x-1">
      <span>by</span>
      <p
        className="font-medium text-green-600 dark:text-green-200"
      >
        {post.author?.title}
      </p>
      <span>
        on {helpers.stringToFriendlyDate(post.published_date)}
      </span>
    </div>
  );
}
