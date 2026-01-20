
import React, { useState } from 'react';

import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
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

  // Fonction pour cocher/décocher une tâche
  function toggleTodo(id) {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  }

  // Fonction pour supprimer une tâche
  function supprimerTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  // Utiliser TodoForm et TodoList pour ajouter et afficher des tâches
  return (
    <div className="App">
      <header className="App-header">
        <h1>Ma TodoList</h1>
        <TodoForm onAjouter={ajouterTodo} />
        <TodoList todos={todos} onToggle={toggleTodo} onSupprimer={supprimerTodo} />
      </header>
    </div>
  );
}

export default App;


