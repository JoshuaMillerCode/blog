import PostCard from '../components/PostCard';

export function PostList() {
  
  let author = {
    id: "author-1",
    slug: "author-slug",
    title: "Author Name",
    metadata: {
      image: {
        img_url: '/avatar.png'
      }
    }
  }
  let posts = [
    {
      id: "1",
      slug: "example-post",
      title: "Example Post Title",
      metadata: {
        published_date: "2023-10-01",
        content: "<p>This is the content of the example post.</p>",
        hero: {
          img_url: '/image.png'
        },
        author: {
          id: "author-1",
          slug: "author-slug",
          title: "Author Name",
          metadata: {
            image: {
              img_url: '/avatar.png'
            }
          }
        },
        teaser: "<p>This is an example teaser for the post.</p>",
        categories: [
          { title: "Category 1" },
          { title: "Category 2" }
        ]
      }
    },
    {
      id: "1",
      slug: "example-post",
      title: "Example Post Title",
      metadata: {
        published_date: "2023-10-01",
        content: "<p>This is the content of the example post.</p>",
        hero: {
          img_url: '/image.png'
        },
        author: {
          id: "author-1",
          slug: "author-slug",
          title: "Author Name",
          metadata: {
            image: {
              img_url: '/avatar.png'
            }
          }
        },
        teaser: "<p>This is an example teaser for the post.</p>",
        categories: [
          { title: "Category 1" },
          { title: "Category 2" }
        ]
      }
    }
  ]
  return (
    <>
      {author && (
        <h1 className="my-4 text-4xl font-bold leading-tight tracking-tight text-zinc-700 dark:text-zinc-300">
          Posts by {author.title}
        </h1>
      )}
      {!posts && 'You must add at least one Post to your Bucket'}
      {posts &&
        posts.map((post) => {
          return (
            <div key={post.id}>
              <PostCard post={post} />
            </div>
          );
        })}
    </>
  );
}
