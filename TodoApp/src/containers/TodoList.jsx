import { useContext } from 'react';
import { TodoContext } from '../App';
import { TodoItem } from '../components';
import completedSvg from '../assets/completed_task.svg';
import noTask from '../assets/no_list.svg';

const TodoList = () => {
	const { todoList } = useContext(TodoContext);
	const todosFromLocalStorage = JSON.parse(
		localStorage.getItem('todolist') || '[]'
	); // Parse the localStorage string

	return (
		<ul id="list">
			{todoList?.length > 0 ? (
				todoList.map((todo) => <TodoItem key={todo.id} {...todo} />)
			) : todosFromLocalStorage.length > 0 &&
			  todosFromLocalStorage.map((todo) => todo.isCompleted) ? (
				<div className="illustration-div">
					<img
						src={completedSvg}
						className="show-off"
						alt="All tasks completed"
					/>
					<span>Booyah! All items completed!</span>
				</div>
			) : (
				<div className="illustration-div">
					<img src={noTask} className="show-off" alt="No tasks" />
					<span>No list items!</span>
				</div>
			)}
		</ul>
	);
};

export default TodoList;
