import React from 'react';
import TodoItem from './TodoItem';
import './TodoList.css';

function TodoList({ todos, toggleComplete, deleteTodo, editTodo, changePriority, changeCategory, categories }) {
  if (todos.length === 0) {
    return <div className="empty-list">Aucune tâche à afficher</div>;
  }

  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
          changePriority={changePriority}
          changeCategory={changeCategory}
          categories={categories}
        />
      ))}
    </div>
  );
}

export default TodoList;