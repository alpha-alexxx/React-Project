import { Link, useLoaderData } from "react-router-dom";
import { getOneUser, getPosts, getTodos } from "../lib/getData";
import { PostCard } from '../ui'
export function User() {
  const { user, userPosts, todos } = useLoaderData()
  const { name, email, address, company, website, username, id } = user
  return (
    <>
      <Link className="back-btn" to='..' >⬅️ Back</Link>
      <div className="container">
        <h1 className="page-title">{name}</h1>
        <div className="page-subtitle">{email}</div>
        <div>
          <b>Company:</b>{company?.name}
        </div>
        <div>
          <b>Website:</b> {website}
        </div>
        <div>
          <b>Address:</b> {address?.city + ', ' + address?.street + ', ' + address?.suite + ', ' + address?.zipcode}
        </div>
        <h3 className="mt-4 mb-2">Posts</h3>
        <div className="container-grid">
          <div className="card-grid">
            {userPosts.map((post, index) => <PostCard key={post.id} {...post} />)}
          </div>
          <div>
            <h1 className="page-title">Todos</h1>
            <ul>
              {todos.map((todo, index) => <li className={todo.completed ? 'strike-through' : ''} key={todo.id}>{todo.title}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

const loader = async ({ request: { signal }, params: { userId } }) => {
  const userData = getOneUser(userId, { signal })
  const userPosts = getPosts({ signal, params: { userId } })
  const todos = getTodos({ signal, params: { userId } })

  return { user: await userData, userPosts: await userPosts, todos: await todos }
}

export const UserPageLayout = { loader, element: <User /> }