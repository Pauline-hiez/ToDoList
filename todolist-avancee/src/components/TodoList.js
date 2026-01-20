import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ todos, onToggle, onSupprimer, onEditer }) {
    if (todos.length === 0) {
        return <p>Aucune tâche. Ajoutes-en une !</p>;
    }
    return (
        <ul>
            {todos.map(todo => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={onToggle}
                    onSupprimer={onSupprimer}
                    onEditer={onEditer}
                />
            ))}
        </ul>
    );
}

export default TodoList;