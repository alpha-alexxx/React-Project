const FilterTodo = ({ filterTodo, setFilterTodo }) => {
	return (
		<div className="filter-form">
			<div className="filter-form-group">
				<label htmlFor="name" id="filter-input-label">
					<i className="fa-solid fa-magnifying-glass"></i>
					<input
						type="text"
						id="name"
						placeholder="Search here..."
						value={filterTodo}
						onChange={(e) => setFilterTodo(e.target.value)}
					/>
				</label>
			</div>
		</div>
	);
};

export default FilterTodo;
