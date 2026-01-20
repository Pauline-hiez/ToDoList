


import React, { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './App.css';


function App() {
  // ...existing code...

  // 1. Créer le state principal avec récupération depuis localStorage
  const [todos, setTodos] = useState(() => {
    const sauvegardes = localStorage.getItem('todos');
    return sauvegardes ? JSON.parse(sauvegardes) : [];
  });
  // Effet SVG sketch-button sur les boutons (réactif à todos)
  useEffect(() => {
    const createSVG = (width, height, radius) => {
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      const rectangle = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      svg.setAttributeNS("http://www.w3.org/2000/svg", "viewBox", `0 0 ${width} ${height}`);
      rectangle.setAttribute("x", "0");
      rectangle.setAttribute("y", "0");
      rectangle.setAttribute("width", "100%");
      rectangle.setAttribute("height", "100%");
      rectangle.setAttribute("rx", `${radius}`);
      rectangle.setAttribute("ry", `${radius}`);
      rectangle.setAttribute("pathLength", "10");
      svg.appendChild(rectangle);
      return svg;
    };

    document.querySelectorAll(".sketch-button").forEach((button) => {
      // Empêche la duplication des SVG si le bouton est re-rendu
      if (button.querySelector('.lines')) return;
      const style = getComputedStyle(button);
      const lines = document.createElement("div");
      lines.classList.add("lines");
      const groupTop = document.createElement("div");
      const groupBottom = document.createElement("div");
      const svg = createSVG(
        button.offsetWidth,
        button.offsetHeight,
        parseInt(style.borderRadius, 10)
      );
      groupTop.appendChild(svg);
      groupTop.appendChild(svg.cloneNode(true));
      groupTop.appendChild(svg.cloneNode(true));
      groupTop.appendChild(svg.cloneNode(true));
      groupBottom.appendChild(svg.cloneNode(true));
      groupBottom.appendChild(svg.cloneNode(true));
      groupBottom.appendChild(svg.cloneNode(true));
      groupBottom.appendChild(svg.cloneNode(true));
      lines.appendChild(groupTop);
      lines.appendChild(groupBottom);
      button.appendChild(lines);
      button.addEventListener("pointerenter", () => {
        button.classList.add("start");
      });
      svg.addEventListener("animationend", () => {
        button.classList.remove("start");
      });
    });
  }, [todos]);
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

  // Fonction pour éditer une tâche
  const editerTodo = (id, nouveauTexte) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: nouveauTexte } : todo
    ));
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
        <div className="filtres">
          <button
            className={`sketch-button ${filtre === 'toutes' ? 'actif' : ''}`}
            onClick={() => setFiltre('toutes')}
          >
            Toutes
          </button>
          <button
            className={`sketch-button ${filtre === 'actives' ? 'actif' : ''}`}
            onClick={() => setFiltre('actives')}
          >
            Actives
          </button>
          <button
            className={`sketch-button ${filtre === 'terminees' ? 'actif' : ''}`}
            onClick={() => setFiltre('terminees')}
          >
            Terminées
          </button>
        </div>
        <TodoForm onAjouter={ajouterTodo} />
        <TodoList todos={getTodosFilters()} onToggle={toggleTodo} onSupprimer={supprimerTodo} onEditer={editerTodo} />
        <button className="sketch-button" onClick={toutSupprimer} style={{ marginTop: 24 }}>Tout supprimer</button>
      </header>
    </div>
  );
}

export default App;


