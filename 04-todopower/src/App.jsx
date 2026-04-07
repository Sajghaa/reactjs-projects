// src/App.jsx
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import useLocalStorage from './hooks/useLocalStorage';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import TodoFilter from './components/TodoFilter';
import Stats from './components/Stats';
import './App.css';

function App() {
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'

  // Add new todo
  const addTodo = (todoData) => {
    const newTodo = {
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      text: todoData.text,
      completed: false,
      createdAt: new Date().toISOString(),
      priority: todoData.priority || 'medium'
    };
    
    setTodos([...todos, newTodo]);
    toast.success('Task added! 🎉');
  };

  // Toggle complete status
  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
    const todo = todos.find(t => t.id === id);
    toast.success(todo?.completed ? 'Task uncompleted' : 'Task completed! ✅');
  };

  // Delete todo
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
    toast.error('Task deleted');
  };

  // Edit todo
  const editTodo = (id, newText) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    ));
    toast.success('Task updated!');
  };

  // Clear all completed
  const clearCompleted = () => {
    const activeTodos = todos.filter(todo => !todo.completed);
    setTodos(activeTodos);
    toast.success('Completed tasks cleared');
  };

  // Filter todos
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div className="app">
      <div className="container">
        <header>
          <h1>✨ TodoPower</h1>
          <p>Simple but powerful task manager</p>
        </header>

        <TodoForm onAdd={addTodo} />
        
        <TodoFilter 
          currentFilter={filter} 
          onFilterChange={setFilter}
          onClearCompleted={clearCompleted}
          hasCompleted={todos.some(t => t.completed)}
        />
        
        <TodoList 
          todos={filteredTodos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
        />
        
        <Stats todos={todos} />
        
        <Toaster 
          position="bottom-center"
          toastOptions={{
            duration: 2000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
      </div>
    </div>
  );
}

export default App;