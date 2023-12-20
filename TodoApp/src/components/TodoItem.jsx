import { useRef } from 'react';
import { useContext, useState } from 'react';
import { TodoContext } from '../App';

const TodoItem = ({ id, isCompleted, todo }) => {
	const { toggleTodo, deleteTodo, updateTodo } = useContext(TodoContext);
	const todoRef = useRef();
	const [isEditing, setIsEditing] = useState(false);

	function handleEdit(e) {
		e.preventDefault();
		updateTodo(id, todoRef.current.value);
		setIsEditing(false);
	}
	return (
		<li className="list-item">
			{isEditing ? (
				<form id="edit-form" onSubmit={handleEdit}>
					<input
						type="text"
						name="edit"
						id="edit-todo"
						ref={todoRef}
						autoFocus={true}
						defaultValue={todo}
					/>
					<div className="btns">
						<button type="submit" data-button-okay>
							<i className="fa-solid fa-check"></i>
						</button>
						<button
							data-button-cancel-edit
							onClick={() => setIsEditing(false)}
						>
							<i className="fa-solid fa-xmark"></i>
						</button>
					</div>
				</form>
			) : (
				<>
					<label className="list-item-label">
						<input
							type="checkbox"
							checked={isCompleted}
							data-list-item-checkbox
							onChange={() => toggleTodo(id, !isCompleted)}
						/>
						<span data-list-item-text>{todo}</span>
					</label>
					<div className="btns">
						<button
							data-button-edit
							onClick={() => setIsEditing(true)}
						>
							<i className="fa-solid fa-pen-to-square"></i>
						</button>
						<button
							data-button-delete
							onClick={() => deleteTodo(id)}
						>
							<i className="fa-solid fa-trash"></i>
						</button>
					</div>
				</>
			)}
		</li>
	);
};

export default TodoItem;
