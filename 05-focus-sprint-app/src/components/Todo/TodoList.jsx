import React, { useState } from 'react';
import { Search, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import TodoItem from './TodoItem';

function TodoList({ todos, onToggle, onDelete, onEdit, title = "Tasks" }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date'); // 'date', 'priority', 'alphabetical'
  const [filterPriority, setFilterPriority] = useState('all');
  const [isCollapsed, setIsCollapsed] = useState(false);

  if (todos.length === 0) {
    return (
      <div className="todo-list-container">
        <div className="list-header">
          <h3>{title}</h3>
          <span className="task-count">0 tasks</span>
        </div>
        <div className="empty-tasks">
          <div className="empty-icon">📝</div>
          <p>No tasks in this list</p>
          <p className="empty-subtitle">Add a task using the form above</p>
        </div>
      </div>
    );
  }

  // Filter tasks
  let filteredTodos = todos.filter(todo => {
    const matchesSearch = todo.text.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = filterPriority === 'all' || todo.priority === filterPriority;
    return matchesSearch && matchesPriority;
  });

  // Sort tasks
  filteredTodos = [...filteredTodos].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    if (sortBy === 'priority') {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }
    if (sortBy === 'alphabetical') {
      return a.text.localeCompare(b.text);
    }
    return 0;
  });

  const completedCount = todos.filter(t => t.completed).length;
  const activeCount = todos.length - completedCount;

  return (
    <div className="todo-list-container">
      <div className="list-header" onClick={() => setIsCollapsed(!isCollapsed)}>
        <div className="header-left">
          <h3>{title}</h3>
          <span className="task-count">
            {activeCount} active • {completedCount} completed
          </span>
        </div>
        <button className="collapse-btn">
          {isCollapsed ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
        </button>
      </div>
      
      {!isCollapsed && (
        <>
          {/* Search and Filter Bar */}
          <div className="todo-controls">
            <div className="search-box">
              <Search size={16} className="search-icon" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            
            <div className="filter-group">
              <Filter size={16} />
              <select 
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Priorities</option>
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
            </div>
            
            <div className="sort-group">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="date">Sort by Date</option>
                <option value="priority">Sort by Priority</option>
                <option value="alphabetical">Sort A-Z</option>
              </select>
            </div>
          </div>
          
          {/* Task List */}
          <div className="todo-items">
            {filteredTodos.length === 0 ? (
              <div className="no-results">
                <p>No tasks match your filters</p>
                <button onClick={() => {
                  setSearchTerm('');
                  setFilterPriority('all');
                }} className="clear-filters-btn">
                  Clear Filters
                </button>
              </div>
            ) : (
              filteredTodos.map(todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={onToggle}
                  onDelete={onDelete}
                  onEdit={onEdit}
                />
              ))
            )}
          </div>
          
          {/* Progress Bar */}
          {todos.length > 0 && (
            <div className="list-progress">
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${(completedCount / todos.length) * 100}%` }}
                />
              </div>
              <span className="progress-text">
                {Math.round((completedCount / todos.length) * 100)}% Complete
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default TodoList;