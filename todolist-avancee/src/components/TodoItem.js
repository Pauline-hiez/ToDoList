function TodoItem({ todo, onToggle, onSupprimer }) {
    return (
        <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
            />
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                {todo.text}
            </span>
            <button onClick={() => onSupprimer(todo.id)} style={{ marginLeft: 'auto' }}>
                Supprimer
            </button>
        </li>
    );
}

export default TodoItem;