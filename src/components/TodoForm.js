import React, { useState } from 'react';
import './TodoForm.css';

function TodoForm({ addTodo }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(input);
    setInput('');
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
      <button type="submit" className="todo-button">
        Ajouter
      </button>
    </form>
  );
}

export default TodoForm;