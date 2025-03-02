import React, { useState } from 'react';
import './TodoForm.css';

function TodoForm({ addTodo, categories }) {
  const [input, setInput] = useState('');
  const [priority, setPriority] = useState('normale');
  const [category, setCategory] = useState('Personnel');

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(input, priority, category);
    setInput('');
    setPriority('normale');
    setCategory('Personnel');
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Ajouter une tâche..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="todo-input"
      />
      <select 
        value={priority} 
        onChange={(e) => setPriority(e.target.value)}
        className="priority-select"
      >
        <option value="basse">Priorité basse</option>
        <option value="normale">Priorité normale</option>
        <option value="haute">Priorité haute</option>
      </select>
      <select 
        value={category} 
        onChange={(e) => setCategory(e.target.value)}
        className="category-select"
      >
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      <button type="submit" className="todo-button">
        Ajouter
      </button>
    </form>
  );
}

export default TodoForm;