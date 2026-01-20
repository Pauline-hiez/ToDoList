
import React, { useState } from 'react';

import TodoForm from './components/TodoForm';
import './App.css';


function App() {
  // 1. Créer le state principal
  const [todos, setTodos] = useState([]);

  // 2. Créer la fonction ajouterTodo
  function ajouterTodo(text) {
    const nouveauTodo = {
      id: Date.now(),
      text: text,
      completed: false
    };
    setTodos([...todos, nouveauTodo]);
  }

  // 3. Utiliser TodoForm pour ajouter des tâches
  return (
    <div className="App">
      <header className="App-header">
        <h1>Ma TodoList</h1>
        <TodoForm onAjouter={ajouterTodo} />
      </header>
    </div>
  );
}


export default App;
