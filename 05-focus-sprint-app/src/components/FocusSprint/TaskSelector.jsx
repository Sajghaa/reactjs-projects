import React from 'react';
import { Sparkles, Clock, AlertCircle } from 'lucide-react';

function TaskSelector({ tasks, isAnalyzing, onSelectTask, selectedTasks }) {
  if (isAnalyzing) {
    return (
      <div className="ai-analyzing">
        <div className="spinner"></div>
        <p>AI is analyzing your tasks...</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="no-tasks">
        <AlertCircle size={48} />
        <h3>No active tasks!</h3>
        <p>Add some tasks to start a focus sprint</p>
      </div>
    );
  }

  return (
    <div className="task-selector">
      <div className="ai-header">
        <Sparkles size={20} className="ai-icon" />
        <h3>AI-Recommended Tasks</h3>
      </div>
      
      <div className="task-list">
        {tasks.map((task, index) => (
          <div
            key={task.id}
            className={`task-card ${selectedTasks.includes(task.id) ? 'selected' : ''}`}
            onClick={() => onSelectTask(task.id)}
          >
            <div className="task-rank">{index + 1}</div>
            <div className="task-info">
              <h4>{task.text}</h4>
              <div className="task-meta">
                <span className={`priority-badge ${task.priority}`}>
                  {task.priority}
                </span>
                {task.aiScore && (
                  <span className="ai-score">
                    AI Score: {Math.round(task.aiScore)}%
                  </span>
                )}
              </div>
            </div>
            <div className="task-select-indicator">
              {selectedTasks.includes(task.id) && '✓'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskSelector;