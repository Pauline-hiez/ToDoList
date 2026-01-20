import React, { useState } from 'react';

function TodoItem({ todo, onToggle, onSupprimer, onEditer }) {
    const [edition, setEdition] = useState(false);
    const [texteEdition, setTexteEdition] = useState(todo.text);

    const handleEdit = (e) => {
        e.preventDefault();
        onEditer(todo.id, texteEdition);
        setEdition(false);
    };

    return (
        <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
            />
            {edition ? (
                <form onSubmit={handleEdit} style={{ flex: 1 }}>
                    <input
                        type="text"
                        value={texteEdition}
                        onChange={e => setTexteEdition(e.target.value)}
                        autoFocus
                        onBlur={handleEdit}
                        style={{ width: '90%' }}
                    />
                </form>
            ) : (
                <span
                    style={{ textDecoration: todo.completed ? 'line-through' : 'none', flex: 1, cursor: 'pointer' }}
                    onDoubleClick={() => setEdition(true)}
                >
                    {todo.text}
                </span>
            )}
            <button onClick={() => setEdition(true)} style={{ marginLeft: 8 }}>Éditer</button>
            <button onClick={() => onSupprimer(todo.id)} style={{ marginLeft: 8 }}>
                Supprimer
            </button>
        </li>
    );
}

export default TodoItem;