import React from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

function SprintTimer({ minutes, seconds, isRunning, onStart, onPause, onReset }) {
  const progress = ((25 * 60 - (minutes * 60 + seconds)) / (25 * 60)) * 100;
  
  return (
    <div className="sprint-timer">
      <div className="timer-circle">
        <svg className="timer-svg" viewBox="0 0 100 100">
          <circle
            className="timer-bg"
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#e0e0e0"
            strokeWidth="8"
          />
          <circle
            className="timer-progress"
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#667eea"
            strokeWidth="8"
            strokeDasharray={`${2 * Math.PI * 45}`}
            strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
            transform="rotate(-90 50 50)"
          />
        </svg>
        <div className="timer-text">
          <span className="minutes">{String(minutes).padStart(2, '0')}</span>
          <span className="separator">:</span>
          <span className="seconds">{String(seconds).padStart(2, '0')}</span>
        </div>
      </div>
      
      <div className="timer-controls">
        {!isRunning ? (
          <button onClick={onStart} className="control-btn play">
            <Play size={20} /> Start
          </button>
        ) : (
          <button onClick={onPause} className="control-btn pause">
            <Pause size={20} /> Pause
          </button>
        )}
        <button onClick={onReset} className="control-btn reset">
          <RotateCcw size={20} /> Reset
        </button>
      </div>
    </div>
  );
}

export default SprintTimer;