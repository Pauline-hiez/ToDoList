
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

  // Statistiques
  const nombreTotal = todos.length;
  const nombreActives = todos.filter(t => !t.completed).length;
  const nombreTerminees = todos.filter(t => t.completed).length;

  // Utiliser TodoForm et TodoList pour ajouter et afficher des tâches
  return (
    <div className="App">
      <header className="App-header">
        <h1>Ma TodoList</h1>
        <div className="stats">
          <p>Total : {nombreTotal}</p>
          <p>Actives : {nombreActives}</p>
          <p>Terminées : {nombreTerminees}</p>
        </div>
        <TodoForm onAjouter={ajouterTodo} />
        <TodoList todos={todos} onToggle={toggleTodo} onSupprimer={supprimerTodo} />
      </header>
    </div>
  );
}

export default App;


