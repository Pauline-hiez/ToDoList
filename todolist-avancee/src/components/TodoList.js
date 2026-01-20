import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ todos, onToggle, onSupprimer }) {
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
                />
            ))}
        </ul>
    );
}

export default TodoList;