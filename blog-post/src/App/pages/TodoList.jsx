import axios from 'axios'
import { useLoaderData } from 'react-router-dom';
import { getTodos } from '../lib/getData'
export function TodoList() {
  const todos = useLoaderData()
  return (
    <div className="container">
      <h1 className="page-title">Todos</h1>
      <ul>
        {todos.map((todo, index) => <li className={todo.completed ? 'strike-through' : ''} key={todo.id}>{todo.title}</li>)}
      </ul>
    </div>
  );
}

async function loader({ request: { signal } }) {
  return getTodos({ signal })

}

export const TodoListLayout = {
  loader, element: <TodoList />
}