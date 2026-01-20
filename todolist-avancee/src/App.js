

import React, { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './App.css';


function App() {
  // 1. Créer le state principal avec récupération depuis localStorage
  const [todos, setTodos] = useState(() => {
    const sauvegardes = localStorage.getItem('todos');
    return sauvegardes ? JSON.parse(sauvegardes) : [];
  });
  // 2. Sauvegarder dans le localStorage à chaque changement de todos
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

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

  // State pour le filtre
  const [filtre, setFiltre] = useState('toutes');

  // Fonction pour filtrer les todos
  const getTodosFilters = () => {
    switch (filtre) {
      case 'actives':
        return todos.filter(t => !t.completed);
      case 'terminees':
        return todos.filter(t => t.completed);
      default:
        return todos;
    }
  };

  // Fonction pour tout supprimer avec confirmation
  const toutSupprimer = () => {
    if (window.confirm('Supprimer toutes les tâches ?')) {
      setTodos([]);
    }
  };

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
        <button onClick={toutSupprimer} style={{ marginBottom: 16 }}>Tout supprimer</button>
        <div className="filtres">
          <button
            className={filtre === 'toutes' ? 'actif' : ''}
            onClick={() => setFiltre('toutes')}
          >
            Toutes
          </button>
          <button
            className={filtre === 'actives' ? 'actif' : ''}
            onClick={() => setFiltre('actives')}
          >
            Actives
          </button>
          <button
            className={filtre === 'terminees' ? 'actif' : ''}
            onClick={() => setFiltre('terminees')}
          >
            Terminées
          </button>
        </div>
        <TodoForm onAjouter={ajouterTodo} />
        <TodoList todos={getTodosFilters()} onToggle={toggleTodo} onSupprimer={supprimerTodo} />
      </header>
    </div>
  );
}

export default App;


