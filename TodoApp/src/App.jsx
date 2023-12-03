import { useState } from 'react';
import './App.css';
import List from './List';
import Notification from './Notification';
import { useEffect } from 'react';
function App() {
  // all Hooks
  const [todo, setTodo] = useState('');
  const [todoList, setTodoList] = useState([]);
  const [notification, setNotification] = useState({});
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => setShow(false), 4000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [show]);

  // All Functions
  const addNewTodo = () => {
    if (todo.trim() === '') {
      setShow(true);
      setNotification({
        title: 'Empty Input',
        desc: 'Todo input is empty.',
        color: '#dc2626',
      });
      return;
    } else if (todo.trim().length > 250) {
      setShow(true);
      setNotification({
        title: 'Too Much Character!',
        desc: 'Todo input is empty.',
        color: '#dc2626',
      });
      return;
    }
    setTodoList((currentList) => {
      return [
        { id: crypto.randomUUID(), item: todo, isCompleted: false },
        ...currentList,
      ];
    });
    setTodo('');
    setShow(true);
    setNotification({
      title: 'Todo Added',
      desc: 'Todo saved successfully.',
      color: '#16a34a',
    });
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      addNewTodo();
    }
  };

  const deleteTodo = (targetId) => {
    setTodoList((currentList) =>
      currentList?.filter((todo) => todo.id !== targetId),
    );
    setShow(true);
    setNotification({
      title: 'Todo Delete',
      desc: 'Todo Delete successfully.',
      color: '#16a34a',
    });
  };
  const toggleTodo = (targetId, isCompleted) => {
    setTodoList((currentList) => {
      return currentList?.map((todo) => {
        if (todo.id === targetId) return { ...todo, isCompleted };
        return todo;
      });
    });
    setShow(true);
    setNotification({
      title: 'Complete!',
      desc: 'Todo Completed.',
      color: '#16a34a',
    });
  };
  return (
    <div id="app">
      <div className="container">
        <h1>Simple Todo App</h1>
        <span>Add New Todo:</span>
        <div id="new-todo-form">
          <input
            type="text"
            id="todo-input"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button id="add-todo-btn" onClick={addNewTodo}>
            <i className="fa fa-plus"></i>
          </button>
        </div>
      </div>{' '}
      <h2>My Todos:</h2>
      <ul id="list">
        {todoList?.length > 0 ? (
          todoList?.map((todo) => (
            <List
              key={todo.id}
              {...todo}
              deleteTodo={deleteTodo}
              toggleTodo={toggleTodo}
            />
          ))
        ) : (
          <h1>No List items</h1>
        )}
      </ul>
      <Notification show={show} {...notification} />
    </div>
  );
}

export default App;
