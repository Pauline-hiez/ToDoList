import React, { useState } from 'react';

function TodoForm({ onAjouter }) {
    const [inputValue, setInputValue] = useState("");
    const [erreur, setErreur] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim() === "") {
            setErreur("Impossible d'ajouter une tâche vide.");
            return;
        }
        onAjouter(inputValue);
        setInputValue("");
        setErreur("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                placeholder="Ajouter une nouvelle tâche..."
            />
            <button type="submit">Ajouter</button>
            {erreur && <div style={{ color: 'red', marginTop: 8 }}>{erreur}</div>}
        </form>
    );
}

export default TodoForm;
