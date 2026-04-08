import React, { useState, useEffect } from 'react';
import { X, CheckCircle } from 'lucide-react';
import SprintTimer from './SprintTimer';
import useTimer from '../../hooks/useTimer';

function FocusMode({ tasks, onComplete, onExit }) {
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [completedTasks, setCompletedTasks] = useState([]);
  const { minutes, seconds, isRunning, start, pause, reset, isComplete } = useTimer(25);

  const currentTask = tasks[currentTaskIndex];

  const completeCurrentTask = () => {
    const newCompleted = [...completedTasks, currentTask.id];
    setCompletedTasks(newCompleted);
    onComplete(currentTask.id);
    
    if (currentTaskIndex + 1 < tasks.length) {
      setCurrentTaskIndex(prev => prev + 1);
      toast.success(`✅ Completed: ${currentTask.text}`);
    } else {
      // Sprint complete!
      toast.success('🎉 Sprint Complete! Amazing work!');
      onExit();
    }
  };

  useEffect(() => {
    if (isComplete) {
      toast.success('Time\'s up! Great focus session!');
      onExit();
    }
  }, [isComplete, onExit]);

  return (
    <div className="focus-mode-overlay">
      <button className="exit-focus" onClick={onExit}>
        <X size={24} />
      </button>
      
      <div className="focus-mode-content">
        <div className="focus-header">
          <h2>🔒 Focus Mode</h2>
          <p>Stay focused on your current task</p>
        </div>
        
        <SprintTimer
          minutes={minutes}
          seconds={seconds}
          isRunning={isRunning}
          onStart={start}
          onPause={pause}
          onReset={() => reset(25)}
        />
        
        <div className="focus-task">
          <h3>Current Task</h3>
          <div className="focus-task-card">
            <p>{currentTask?.text}</p>
            <button onClick={completeCurrentTask} className="complete-focus-btn">
              <CheckCircle size={20} />
              Complete Task
            </button>
          </div>
        </div>
        
        <div className="focus-progress">
          <div className="progress-steps">
            {tasks.map((_, idx) => (
              <div
                key={idx}
                className={`step ${idx === currentTaskIndex ? 'active' : ''} ${
                  idx < currentTaskIndex ? 'completed' : ''
                }`}
              >
                {idx < currentTaskIndex ? '✓' : idx + 1}
              </div>
            ))}
          </div>
          <span>Task {currentTaskIndex + 1} of {tasks.length}</span>
        </div>
      </div>
    </div>
  );
}

export default FocusMode;