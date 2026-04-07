import React, { useState } from 'react';

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    if (editText.trim() && editText !== todo.text) {
      onEdit(todo.id, editText.trim());
    }
    setIsEditing(false);
  };

  const priorityColors = {
    high: 'priority-high',
    medium: 'priority-medium',
    low: 'priority-low'
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="todo-checkbox"
      />
      
      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleEdit}
          onKeyPress={(e) => e.key === 'Enter' && handleEdit()}
          className="todo-edit-input"
          autoFocus
        />
      ) : (
        <div className="todo-content">
          <span className={`todo-text ${priorityColors[todo.priority]}`}>
            {todo.text}
          </span>
          <span className="todo-priority-badge">{todo.priority}</span>
        </div>
      )}
      
      <div className="todo-actions">
        {!isEditing && (
          <button onClick={() => setIsEditing(true)} className="edit-btn">
            ✏️
          </button>
        )}
        <button onClick={() => onDelete(todo.id)} className="delete-btn">
          🗑️
        </button>
      </div>
    </div>
  );
}

export default TodoItem;