import { useContext } from 'react';
import { useRef } from 'react';
import { TodoContext } from '../App';

const NewTodoForm = () => {
	const nameRef = useRef();
	const { addNewTodo } = useContext(TodoContext);
	function handleSubmit(e) {
		e.preventDefault();

		addNewTodo(nameRef.current.value);

		nameRef.current.value = '';
	}
	return (
		<form id="new-todo-form" onSubmit={handleSubmit}>
			<input type="text" id="todo-input" ref={nameRef} autoFocus />
			<button type="submit">
				<i className="fa-solid fa-plus"></i>
			</button>
		</form>
	);
};

export default NewTodoForm;
