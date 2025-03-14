import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons'
import { faThumbsUp as faThumbsUpSolid } from '@fortawesome/free-solid-svg-icons';
import { Post } from '../lib/types';

function ThumbsUp({ post, liked, handleLike }: { post: Post, liked: boolean, handleLike: () => void }) {
  return (
    <>
      <FontAwesomeIcon 
        icon={liked ? faThumbsUpSolid : faThumbsUp} 
        className="text-white hover:cursor-pointer active:text-blue-500 active:scale-110" 
        size="2xl" 
        onClick={handleLike} 
      />
      <p className="text-white text-3xl">{post.likes}</p>
    </>
  );
}

export default ThumbsUp;