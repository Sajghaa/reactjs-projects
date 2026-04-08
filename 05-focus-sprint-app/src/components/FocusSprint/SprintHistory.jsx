import React from 'react';
import { Trophy, Calendar, CheckCircle } from 'lucide-react';

function SprintHistory({ sessions }) {
  if (sessions.length === 0) {
    return (
      <div className="sprint-history empty">
        <Trophy size={48} />
        <h3>No sprints yet</h3>
        <p>Complete your first focus sprint to see history</p>
      </div>
    );
  }

  const totalTasks = sessions.reduce((sum, s) => sum + s.tasksCompleted, 0);
  const totalSprints = sessions.length;
  const avgTasksPerSprint = (totalTasks / totalSprints).toFixed(1);

  return (
    <div className="sprint-history">
      <h3>📊 Sprint History</h3>
      
      <div className="history-stats">
        <div className="history-stat">
          <span className="stat-value">{totalSprints}</span>
          <span className="stat-label">Sprints</span>
        </div>
        <div className="history-stat">
          <span className="stat-value">{totalTasks}</span>
          <span className="stat-label">Tasks Done</span>
        </div>
        <div className="history-stat">
          <span className="stat-value">{avgTasksPerSprint}</span>
          <span className="stat-label">Avg/Sprint</span>
        </div>
      </div>
      
      <div className="history-list">
        {sessions.slice(-5).reverse().map((session, idx) => (
          <div key={idx} className="history-item">
            <div className="history-date">
              <Calendar size={14} />
              {new Date(session.date).toLocaleDateString()}
            </div>
            <div className="history-details">
              <CheckCircle size={14} />
              {session.tasksCompleted} tasks
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SprintHistory;