import React, { useState } from 'react';
import './CategoryManager.css';

function CategoryManager({ categories, addCategory, deleteCategory }) {
  const [newCategory, setNewCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addCategory(newCategory);
    setNewCategory('');
  };

  return (
    <div className="category-manager">
      <h3>Gérer les catégories</h3>
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Nouvelle catégorie..."
        />
        <button type="submit">Ajouter</button>
      </form>
      
      <div className="category-list">
        {categories.map(category => (
          <div key={category} className="category-item">
            <span>{category}</span>
            {category !== 'Personnel' && (
              <button 
                onClick={() => deleteCategory(category)}
                className="delete-category"
              >
                ×
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryManager;