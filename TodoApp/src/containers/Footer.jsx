import { useContext } from 'react';
import { TodoContext } from '../App';

const Footer = () => {
	const {
		clearAll,
		notification: { title, desc, color },
		showNotification: show,
	} = useContext(TodoContext);

	return (
		<>
			<div
				style={{
					opacity: show ? '1' : '0',
					display: show ? 'flex' : 'none',
				}}
				className="notification"
			>
				<span className="notification-title" style={{ color: color }}>
					{title}
				</span>
				{' : '}
				<span className="notification-desc">{desc}</span>
			</div>
			<button onClick={clearAll}>Clear all</button>
		</>
	);
};

export default Footer;
