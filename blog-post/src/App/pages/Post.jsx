import { Link, useLoaderData } from "react-router-dom";
import { getComments, getOnePost, getOneUser } from "../lib/getData";
import { Comment } from '../ui'

export function Post() {
  const { post, comments, user } = useLoaderData()
  return (
    <>
      <Link className='back-btn' to='..' >⬅️ Back</Link>
      <div className="container">
        <h1 className="page-title">
          {post.title}
        </h1>
        <span className="page-subtitle">
          By: <Link to={`/users/${user.id}`}>{user.name}</Link>
        </span>
        <div>
          {post.body}
        </div>
        <h3 className="mt-4 mb-2">Comments</h3>
        <div className="card-stack">
          {comments.map((comment, index) => <Comment key={comment.id} {...comment} />)}
        </div>
      </div>
    </>
  );
}
const loader = async ({ request: { signal }, params }) => {

  const post = await getOnePost(params.postId, { signal })
  const comments = getComments(params.postId, { signal })
  const user = getOneUser(post.userId, { signal })
  return { post, comments: await comments, user: await user }


}

export const PostPageLayout = { loader, element: <Post /> }