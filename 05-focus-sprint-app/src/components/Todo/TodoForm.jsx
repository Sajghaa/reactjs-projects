import React, { useState } from 'react';
import { PlusCircle, Calendar, Flag } from 'lucide-react';

function TodoForm({ onAdd }) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    
    onAdd({ 
      text: text.trim(), 
      priority,
      dueDate: dueDate || null
    });
    
    setText('');
    setPriority('medium');
    setDueDate('');
    setShowAdvanced(false);
  };

  const getPriorityColor = (p) => {
    const colors = {
      high: '#ff4757',
      medium: '#ffa502',
      low: '#2ed573'
    };
    return colors[p];
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <div className="form-container">
        <div className="input-group">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What needs to be done?"
            className="todo-input"
            autoFocus
          />
          <button type="submit" className="submit-btn">
            <PlusCircle size={20} />
            Add Task
          </button>
        </div>
        
        <div className="form-options">
          <button 
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="advanced-toggle"
          >
            {showAdvanced ? '−' : '+'} Advanced Options
          </button>
        </div>
        
        {showAdvanced && (
          <div className="advanced-options">
            <div className="option-group">
              <label>
                <Flag size={16} />
                Priority
              </label>
              <div className="priority-buttons">
                {['high', 'medium', 'low'].map(p => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPriority(p)}
                    className={`priority-btn ${priority === p ? 'active' : ''}`}
                    style={{
                      background: priority === p ? getPriorityColor(p) : '#f0f0f0',
                      color: priority === p ? 'white' : '#666'
                    }}
                  >
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="option-group">
              <label>
                <Calendar size={16} />
                Due Date (Optional)
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="date-input"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>
        )}
      </div>
    </form>
  );
}

export default TodoForm;