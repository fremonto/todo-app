import React, { useState } from 'react';
import { FaTrash, FaEdit, FaCheck, FaTimes, FaFlag, FaTag } from 'react-icons/fa';
import './TodoItem.css';

function TodoItem({ todo, toggleComplete, deleteTodo, editTodo, changePriority, changeCategory, categories }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editPriority, setEditPriority] = useState(todo.priority || 'normale');
  const [editCategory, setEditCategory] = useState(todo.category || 'Personnel');

  const handleEdit = () => {
    setIsEditing(true);
    setEditText(todo.text);
    setEditPriority(todo.priority || 'normale');
    setEditCategory(todo.category || 'Personnel');
  };

  const handleSave = () => {
    editTodo(todo.id, editText, editPriority, editCategory);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditText(todo.text);
    setEditPriority(todo.priority || 'normale');
    setEditCategory(todo.category || 'Personnel');
  };

  const handlePriorityChange = (priority) => {
    if (changePriority) {
      changePriority(todo.id, priority);
    }
  };

  const handleCategoryChange = (e) => {
    if (changeCategory) {
      changeCategory(todo.id, e.target.value);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'haute':
        return 'priority-high';
      case 'basse':
        return 'priority-low';
      default:
        return 'priority-normal';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''} ${getPriorityColor(todo.priority)}`}>
      {isEditing ? (
        <div className="edit-form">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            autoFocus
          />
          <select 
            value={editPriority} 
            onChange={(e) => setEditPriority(e.target.value)}
            className="priority-select"
          >
            <option value="basse">Basse</option>
            <option value="normale">Normale</option>
            <option value="haute">Haute</option>
          </select>
          <select 
            value={editCategory} 
            onChange={(e) => setEditCategory(e.target.value)}
            className="category-select"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <div className="edit-actions">
            <button onClick={handleSave} className="save-btn">
              <FaCheck />
            </button>
            <button onClick={handleCancel} className="cancel-btn">
              <FaTimes />
            </button>
          </div>
        </div>
      ) : (
        <>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleComplete(todo.id)}
          />
          <div className="todo-content">
            <div className="todo-text">{todo.text}</div>
            <div className="todo-meta">
              <div className="todo-date">{formatDate(todo.createdAt)}</div>
              <div className={`todo-priority ${getPriorityColor(todo.priority)}`}>
                {todo.priority || 'normale'}
              </div>
              <div className="todo-category">
                <FaTag /> {todo.category || 'Personnel'}
              </div>
            </div>
          </div>
          <div className="todo-actions">
            {!todo.completed && (
              <>
                <div className="priority-actions">
                  <button 
                    onClick={() => handlePriorityChange('basse')} 
                    className={`priority-btn ${todo.priority === 'basse' ? 'active' : ''}`}
                    title="Priorité basse"
                  >
                    <FaFlag className="priority-icon priority-low" />
                  </button>
                  <button 
                    onClick={() => handlePriorityChange('normale')} 
                    className={`priority-btn ${todo.priority === 'normale' || !todo.priority ? 'active' : ''}`}
                    title="Priorité normale"
                  >
                    <FaFlag className="priority-icon priority-normal" />
                  </button>
                  <button 
                    onClick={() => handlePriorityChange('haute')} 
                    className={`priority-btn ${todo.priority === 'haute' ? 'active' : ''}`}
                    title="Priorité haute"
                  >
                    <FaFlag className="priority-icon priority-high" />
                  </button>
                </div>
                <select 
                  value={todo.category || 'Personnel'} 
                  onChange={handleCategoryChange}
                  className="quick-category-select"
                  title="Changer de catégorie"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </>
            )}
            <button onClick={handleEdit} className="edit-btn" disabled={todo.completed}>
              <FaEdit />
            </button>
            <button onClick={() => deleteTodo(todo.id)} className="delete-btn">
              <FaTrash />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default TodoItem;