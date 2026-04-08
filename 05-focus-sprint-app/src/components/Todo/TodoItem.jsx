import React, { useState } from 'react';
import { CheckCircle, Circle, Trash2, Edit2, Save, X, Calendar, Flag } from 'lucide-react';

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [showDetails, setShowDetails] = useState(false);

  const handleEdit = () => {
    if (editText.trim() && editText !== todo.text) {
      onEdit(todo.id, editText.trim());
    }
    setIsEditing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleEdit();
    }
    if (e.key === 'Escape') {
      setIsEditing(false);
      setEditText(todo.text);
    }
  };

  const getPriorityInfo = () => {
    const priorities = {
      high: { label: 'High', color: '#ff4757', icon: '🔴' },
      medium: { label: 'Medium', color: '#ffa502', icon: '🟠' },
      low: { label: 'Low', color: '#2ed573', icon: '🟢' }
    };
    return priorities[todo.priority] || priorities.medium;
  };

  const priorityInfo = getPriorityInfo();
  const isOverdue = todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed;

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''} ${isOverdue ? 'overdue' : ''}`}>
      <button 
        onClick={() => onToggle(todo.id)} 
        className="todo-checkbox"
        aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
      >
        {todo.completed ? (
          <CheckCircle size={24} className="checked" />
        ) : (
          <Circle size={24} className="unchecked" />
        )}
      </button>
      
      <div className="todo-main">
        {isEditing ? (
          <div className="edit-container">
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onBlur={handleEdit}
              onKeyDown={handleKeyPress}
              className="edit-input"
              autoFocus
            />
            <button onClick={handleEdit} className="edit-action save">
              <Save size={16} />
            </button>
            <button onClick={() => setIsEditing(false)} className="edit-action cancel">
              <X size={16} />
            </button>
          </div>
        ) : (
          <>
            <div className="todo-header">
              <span 
                className="todo-text"
                onClick={() => setShowDetails(!showDetails)}
                style={{ cursor: 'pointer' }}
              >
                {todo.text}
              </span>
              <div className="todo-badges">
                <span className="priority-badge" style={{ background: priorityInfo.color }}>
                  {priorityInfo.icon} {priorityInfo.label}
                </span>
                {todo.dueDate && (
                  <span className={`due-date-badge ${isOverdue ? 'overdue' : ''}`}>
                    <Calendar size={12} />
                    {new Date(todo.dueDate).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
            
            {showDetails && (
              <div className="todo-details">
                <div className="detail-item">
                  <span className="detail-label">Created:</span>
                  <span className="detail-value">
                    {new Date(todo.createdAt).toLocaleString()}
                  </span>
                </div>
                {todo.completed && (
                  <div className="detail-item">
                    <span className="detail-label">Completed:</span>
                    <span className="detail-value">
                      {new Date(todo.updatedAt || todo.createdAt).toLocaleString()}
                    </span>
                  </div>
                )}
                {isOverdue && (
                  <div className="detail-item warning">
                    ⚠️ This task is overdue!
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
      
      {!isEditing && (
        <div className="todo-actions">
          <button 
            onClick={() => setIsEditing(true)} 
            className="action-btn edit"
            aria-label="Edit task"
          >
            <Edit2 size={16} />
          </button>
          <button 
            onClick={() => onDelete(todo.id)} 
            className="action-btn delete"
            aria-label="Delete task"
          >
            <Trash2 size={16} />
          </button>
        </div>
      )}
    </div>
  );
}

export default TodoItem;