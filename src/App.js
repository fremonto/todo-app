import React, { useState, useEffect } from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import CategoryManager from './components/CategoryManager';

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [categories, setCategories] = useState(['Personnel']);
  const [showCategoryManager, setShowCategoryManager] = useState(false);

  // Charger les todos et catégories depuis le localStorage au démarrage
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    const storedCategories = JSON.parse(localStorage.getItem('categories')) || ['Personnel'];
    setTodos(storedTodos);
    setCategories(storedCategories);
  }, []);

  // Sauvegarder les todos et catégories dans le localStorage à chaque modification
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  // Ajouter une nouvelle tâche
  const addTodo = (text, priority = 'normale', category = 'Personnel') => {
    if (text.trim() === '') return;
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date().toISOString(),
      priority,
      category
    };
    setTodos([newTodo, ...todos]);
  };

  // Marquer une tâche comme complétée ou non
  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Supprimer une tâche
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Modifier une tâche
  const editTodo = (id, newText, newPriority, newCategory) => {
    if (newText.trim() === '') return;
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { 
          ...todo, 
          text: newText, 
          priority: newPriority,
          category: newCategory 
        } : todo
      )
    );
  };

  // Changer la priorité d'une tâche
  const changePriority = (id, priority) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, priority } : todo
      )
    );
  };

  // Changer la catégorie d'une tâche
  const changeCategory = (id, category) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, category } : todo
      )
    );
  };

  // Ajouter une catégorie
  const addCategory = (categoryName) => {
    if (categoryName.trim() === '' || categories.includes(categoryName)) return;
    setCategories([...categories, categoryName]);
  };

  // Supprimer une catégorie
  const deleteCategory = (categoryName) => {
    if (categoryName === 'Personnel') return; // Ne pas supprimer la catégorie par défaut
    
    // Mettre à jour les todos avec cette catégorie
    const updatedTodos = todos.map(todo => 
      todo.category === categoryName ? {...todo, category: 'Personnel'} : todo
    );
    
    setTodos(updatedTodos);
    setCategories(categories.filter(cat => cat !== categoryName));
    
    // Réinitialiser le filtre si nécessaire
    if (categoryFilter === categoryName) {
      setCategoryFilter('all');
    }
  };

  // Filtrer les tâches selon le statut et la catégorie
  const filteredTodos = todos.filter((todo) => {
    // Filtre par statut
    const statusMatch = 
      filter === 'all' ? true : 
      filter === 'active' ? !todo.completed : 
      todo.completed;
    
    // Filtre par catégorie
    const categoryMatch = 
      categoryFilter === 'all' ? true : 
      todo.category === categoryFilter;
    
    return statusMatch && categoryMatch;
  });

  // Supprimer toutes les tâches complétées
  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  // Statistiques
  const stats = {
    total: todos.length,
    active: todos.filter((todo) => !todo.completed).length,
    completed: todos.filter((todo) => todo.completed).length,
    high: todos.filter((todo) => todo.priority === 'haute').length,
    medium: todos.filter((todo) => todo.priority === 'normale').length,
    low: todos.filter((todo) => todo.priority === 'basse').length,
    byCategory: categories.reduce((acc, cat) => {
      acc[cat] = todos.filter(todo => todo.category === cat).length;
      return acc;
    }, {})
  };

  return (
    <div className="app-container">
      <h1>Todo List</h1>
      
      <TodoForm addTodo={addTodo} categories={categories} />
      
      <div className="category-controls">
        <button 
          className="manage-categories-btn"
          onClick={() => setShowCategoryManager(!showCategoryManager)}
        >
          Gérer les catégories
        </button>
        
        {showCategoryManager && (
          <CategoryManager 
            categories={categories} 
            addCategory={addCategory} 
            deleteCategory={deleteCategory} 
          />
        )}
      </div>

      <div className="filters">
        <div className="status-filters">
          <button
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            Toutes
          </button>
          <button
            className={filter === 'active' ? 'active' : ''}
            onClick={() => setFilter('active')}
          >
            À faire
          </button>
          <button
            className={filter === 'completed' ? 'active' : ''}
            onClick={() => setFilter('completed')}
          >
            Complétées
          </button>
          {stats.completed > 0 && (
            <button className="clear" onClick={clearCompleted}>
              Supprimer complétées
            </button>
          )}
        </div>
        
        <div className="category-filters">
          <span>Catégorie:</span>
          <select 
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">Toutes les catégories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="stats">
        <span>{stats.total} tâches au total</span>
        <span>{stats.active} à faire</span>
        <span>{stats.completed} complétées</span>
      </div>
      
      <TodoList
        todos={filteredTodos}
        toggleComplete={toggleComplete}
        deleteTodo={deleteTodo}
        editTodo={editTodo}
        changePriority={changePriority}
        changeCategory={changeCategory}
        categories={categories}
      />
    </div>
  );
}

export default App;