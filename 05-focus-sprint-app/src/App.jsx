// src/App.jsx
import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import FocusSprint from './components/FocusSprint/FocusSprint';
import TodoList from './components/Todo/TodoList';
import TodoForm from './components/Todo/TodoForm';
import useLocalStorage from './hooks/useLocalStorage';
import './App.css';

function App() {
  const [todos, setTodos] = useLocalStorage('todos', []);

  const addTodo = (todoData) => {
    const newTodo = {
      id: crypto.randomUUID(),
      text: todoData.text,
      completed: false,
      priority: todoData.priority || 'medium',
      createdAt: new Date().toISOString()
    };
    setTodos([...todos, newTodo]);
  };

  const updateTodo = (id, updates) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, ...updates } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="app">
      <div className="container">
        <header>
          <h1>🎯 FocusSprint AI</h1>
          <p>AI-powered productivity system</p>
        </header>
        
        <FocusSprint 
          todos={todos}
          onUpdateTodo={updateTodo}
        />
        
        <TodoForm onAdd={addTodo} />
        
        <TodoList
          todos={todos.filter(t => !t.completed)}
          onToggle={(id) => updateTodo(id, { completed: true })}
          onDelete={deleteTodo}
          title="Active Tasks"
        />
        
        <TodoList
          todos={todos.filter(t => t.completed)}
          onToggle={(id) => updateTodo(id, { completed: false })}
          onDelete={deleteTodo}
          title="Completed"
        />
        
        <Toaster />
      </div>
    </div>
  );
}

export default App;