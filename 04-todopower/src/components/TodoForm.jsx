import React, { useState } from 'react';

function TodoForm({ onAdd }) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('medium');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    
    onAdd({ text: text.trim(), priority });
    setText('');
    setPriority('medium');
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What needs to be done?"
          autoFocus
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="high">🔥 High Priority</option>
          <option value="medium">📌 Medium Priority</option>
          <option value="low">💤 Low Priority</option>
        </select>
        <button type="submit">Add Task</button>
      </div>
    </form>
  );
}

export default TodoForm;