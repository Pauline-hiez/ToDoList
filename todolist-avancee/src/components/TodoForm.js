import React, { useState } from 'react';

function TodoForm({ onAjouter }) {
	const [inputValue, setInputValue] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		if (inputValue.trim() === "") return;
		onAjouter(inputValue);
		setInputValue("");
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				value={inputValue}
				onChange={e => setInputValue(e.target.value)}
				placeholder="Ajouter une tâche..."
			/>
			<button type="submit">Ajouter</button>
		</form>
	);
}

export default TodoForm;
