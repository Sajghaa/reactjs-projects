import React from 'react';

function TodoFilter({ currentFilter, onFilterChange, onClearCompleted, hasCompleted }) {
  const filters = [
    { id: 'all', label: 'All', icon: '📋' },
    { id: 'active', label: 'Active', icon: '🔄' },
    { id: 'completed', label: 'Completed', icon: '✅' }
  ];

  return (
    <div className="todo-filters">
      <div className="filter-buttons">
        {filters.map(filter => (
          <button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            className={`filter-btn ${currentFilter === filter.id ? 'active' : ''}`}
          >
            {filter.icon} {filter.label}
          </button>
        ))}
      </div>
      
      {hasCompleted && (
        <button onClick={onClearCompleted} className="clear-btn">
          Clear Completed
        </button>
      )}
    </div>
  );
}

export default TodoFilter;