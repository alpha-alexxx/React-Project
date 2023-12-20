import { useMemo, useReducer, useState } from 'react';
import './App.css';
import { useEffect } from 'react';
import { createContext } from 'react';
import { FilterTodo, NewTodoForm, Footer, TodoList } from './containers';
import { createPortal } from 'react-dom';

const TODO_KEY = 'todolist';
export const TodoContext = createContext();
const ACTIONS = {
	ADD: 'ADD',
	UPDATE: 'UPDATE',
	DELETE: 'DELETE',
	TOGGLE: 'TOGGLE',
	CLEAR: 'CLEAR',
};
const reducer = (todos, { type, payload }) => {
	switch (type) {
		case ACTIONS.ADD:
			return [
				{
					todo: payload.todo,
					isCompleted: false,
					id: crypto.randomUUID(),
				},
				...todos,
			];
		case ACTIONS.UPDATE:
			return todos.map((todo) => {
				if (todo.id === payload.id) {
					return { ...todo, todo: payload.todo };
				}
				return todo;
			});
		case ACTIONS.DELETE:
			return todos?.filter((todo) => todo.id !== payload.targetId);
		case ACTIONS.TOGGLE:
			return todos?.map((todo) => {
				if (todo.id === payload.targetId) {
					return { ...todo, isCompleted: payload.isCompleted };
				}
				return todo;
			});
		case ACTIONS.CLEAR:
			return [];
		default:
			throw new Error(`I can't match your action : ${type}`);
	}
};

function App() {
	// all Hooks
	const [todoList, dispatch] = useReducer(reducer, [], (Initial) => {
		const value = localStorage.getItem(TODO_KEY);
		if (value !== null) {
			return JSON.parse(value);
		} else {
			return Initial;
		}
	});
	const [filterTodo, setFilterTodo] = useState('');
	const [hide, setHide] = useState(() => {
		const value = localStorage.getItem('isHiding');
		if (value !== null) {
			return JSON.parse(value);
		} else {
			return false;
		}
	});

	const [notification, setNotification] = useState({});

	const [showNotification, setShowNotification] = useState(false);

	useEffect(() => {
		localStorage.setItem(TODO_KEY, JSON.stringify(todoList));
		const timeoutId = setTimeout(() => setShowNotification(false), 4000);
		return () => {
			clearTimeout(timeoutId);
		};
	}, [todoList]);
	useEffect(() => {
		localStorage.setItem('isHiding', JSON.stringify(hide));
	}, [hide]);

	const filteredTodos = useMemo(() => {
		return todoList.filter((item) => {
			const isCompleted = item?.isCompleted ?? false; // Default to false if undefined
			const todoText = item?.todo ?? ''; // Default to empty string if undefined
			if (hide && isCompleted) return false;
			return todoText.includes(filterTodo);
		});
	}, [todoList, hide, filterTodo]);

	// All Functions
	const addNewTodo = (todo) => {
		if (todo.trim() === '') {
			setShowNotification(true);
			setNotification({
				title: 'Empty Input',
				desc: 'Todo input is empty.',
				color: '#dc2626',
			});
			return;
		} else if (todo.trim().length > 250) {
			setShowNotification(true);
			setNotification({
				title: 'OverLimit!!!',
				desc: 'Too Much Character.',
				color: '#dc2626',
			});
			return;
		}
		dispatch({ type: ACTIONS.ADD, payload: { todo } });

		setShowNotification(true);
		setNotification({
			title: 'Todo Added',
			desc: 'Todo saved successfully.',
			color: '#16a34a',
		});
	};

	const updateTodo = (id, name) => {
		if (name === '') {
			setShowNotification(true);
			setNotification({
				title: 'Empty Todo',
				desc: "You can't put an empty todo.",
				color: '#dc2626',
			});
			return;
		} else {
			dispatch({ type: ACTIONS.UPDATE, payload: { id, todo: name } });
			setShowNotification(true);
			setNotification({
				title: 'Updated',
				desc: 'Todo updated Successfully.',
				color: '#16a34a',
			});
		}
	};

	const deleteTodo = (targetId) => {
		dispatch({ type: ACTIONS.DELETE, payload: { targetId } });
		setShowNotification(true);
		setNotification({
			title: 'Todo Delete',
			desc: 'Todo Delete successfully.',
			color: '#16a34a',
		});
	};

	const toggleTodo = (targetId, isCompleted) => {
		dispatch({ type: ACTIONS.TOGGLE, payload: { targetId, isCompleted } });
		if (isCompleted === true) {
			setShowNotification(true);
			setNotification({
				title: 'Complete!',
				desc: 'Todo Completed.',
				color: '#16a34a',
			});
		}
	};
	const clearAll = () => {
		if (todoList.length < 1) {
			setShowNotification(true);
			setNotification({
				title: 'Empty List',
				desc: "You can't clear things that are already empty.",
				color: '#dc2626',
			});
			return;
		} else {
			if (confirm('Do you want to clear all?')) {
				dispatch({ type: ACTIONS.CLEAR });
				setShowNotification(true);
				setNotification({
					title: 'Cleared!',
					desc: 'All data Cleared.',
					color: '#16a34a',
				});
			} else {
				return;
			}
		}
	};

	return (
		<TodoContext.Provider
			value={{
				todoList: filteredTodos,
				addNewTodo,
				toggleTodo,
				deleteTodo,
				updateTodo,
				clearAll,
				notification,
				showNotification,
			}}
		>
			<header className="sticky-container">
				<div className="brand">
					<img
						src="./logo.svg"
						className="brand-logo"
						alt="Todo App"
					/>
					<span className="brand-name">Todo App</span>
				</div>
				<NewTodoForm addNewTodo={addNewTodo} />
				<FilterTodo
					filterTodo={filterTodo}
					setFilterTodo={setFilterTodo}
				/>
				<footer>
					All Todos:
					<label
						id="hide-completed-label"
						htmlFor="hide-completed-checkbox"
					>
						<input
							type="checkbox"
							id="hide-completed-checkbox"
							checked={hide}
							onChange={(e) => setHide(e.target.checked)}
						/>
					</label>
				</footer>
			</header>
			<main className="main-lists">
				<TodoList />
			</main>
			{createPortal(<Footer />, document.querySelector('#app-footer'))}
		</TodoContext.Provider>
	);
}

export default App;
