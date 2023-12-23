import { useLoaderData } from "react-router-dom";
import axios from 'axios'
import { UserCard } from "../ui";
import { getUsers } from "../lib/getData";
export function UserList() {
  const users = useLoaderData()
  return (
    <div className="container">
      <h1 className="page-title">Users</h1>
      <div className="card-grid">
        {users.map((user, index) => <UserCard key={user.id} {...user} />)}
      </div>
    </div>
  );
}


async function loader({ request: { signal } }) {
  return getUsers({ signal })
}

export const UserListLayout = {
  loader, element: <UserList />
}