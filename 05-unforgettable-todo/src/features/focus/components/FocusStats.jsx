import React from 'react';
import { useLocalStorage } from '../../../shared/hooks/useLocalStorage';

function FocusStats() {
  const [sessions] = useLocalStorage('focusSessions', []);

  const totalFocusTime = sessions.reduce((sum, s) => sum + (s.timeSpent || 25), 0);
  const totalTasksCompleted = sessions.reduce((sum, s) => sum + (s.tasksCompleted || 0), 0);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
      <h3 className="font-semibold mb-4">Focus Statistics</h3>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span>Total Sessions</span>
          <span className="font-bold">{sessions.length}</span>
        </div>
        <div className="flex justify-between">
          <span>Total Focus Time</span>
          <span className="font-bold">{totalFocusTime} min</span>
        </div>
        <div className="flex justify-between">
          <span>Tasks Completed</span>
          <span className="font-bold">{totalTasksCompleted}</span>
        </div>
      </div>
    </div>
  );
}

export default FocusStats;