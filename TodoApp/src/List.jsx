const List = ({ item, id, isCompleted, deleteTodo, toggleTodo }) => {
  return (
    <li className="list-item" data-list-item>
      <label className="list-item-label">
        <input
          type="checkbox"
          data-list-item-checkbox
          checked={isCompleted}
          onChange={(e) => toggleTodo(id, e.target.checked)}
        />
        <span data-list-item-text>{item}</span>
      </label>
      <button
        data-button-delete
        id="delete-btn"
        onClick={() => deleteTodo(id)}
      >
        <i className="fa fa-trash"></i>
      </button>
    </li>
  );
};

export default List;
