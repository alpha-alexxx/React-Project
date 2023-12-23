import { useLoaderData } from "react-router-dom";
import { PostCard } from '../ui/'
import { getPosts } from '../lib/getData'

export function PostList() {
  const posts = useLoaderData()
  return (
    <>
      <h1 className="page-title">Posts</h1>
      <div className="card-grid">
        {posts.map((post, index) =>
          <PostCard key={index + post.id} {...post} />
        )}
      </div>
    </>
  );
}

async function loader({ request: { signal } }) {
  return getPosts({ signal })
}

export const PostListLayout = {
  loader, element: <PostList />
}