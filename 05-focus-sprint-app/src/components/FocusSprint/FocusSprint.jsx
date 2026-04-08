import React, { useState } from 'react';
import { Zap } from 'lucide-react';
import toast from 'react-hot-toast';
import useAIPrioritizer from '../../hooks/useAIPrioritizer';
import useLocalStorage from '../../hooks/useLocalStorage';
import TaskSelector from './TaskSelector';
import FocusMode from './FocusMode';
import SprintHistory from './SprintHistory';
import './FocusSprint.css';

function FocusSprint({ todos, onUpdateTodo }) {
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [sessions, setSessions] = useLocalStorage('focusSessions', []);
  
  const { prioritizedTasks, suggestions, isAnalyzing } = useAIPrioritizer(todos);

  const startSprint = () => {
    if (selectedTasks.length === 0) {
      toast.error('Select at least one task to start!');
      return;
    }
    
    const selectedTaskObjects = prioritizedTasks.filter(t => selectedTasks.includes(t.id));
    if (selectedTaskObjects.length === 0) return;
    
    setIsFocusMode(true);
    
    // Track session start
    const newSession = {
      id: Date.now(),
      date: new Date().toISOString(),
      tasks: selectedTaskObjects.map(t => t.id),
      tasksCompleted: 0,
      completed: false
    };
    
    setSessions([newSession, ...sessions]);
  };

  const completeTask = (taskId) => {
    onUpdateTodo(taskId, { completed: true });
    
    // Update current session
    const currentSession = sessions[0];
    if (currentSession) {
      currentSession.tasksCompleted++;
      setSessions([currentSession, ...sessions.slice(1)]);
    }
  };

  const exitFocusMode = () => {
    setIsFocusMode(false);
    setSelectedTasks([]);
  };

  const toggleTaskSelection = (taskId) => {
    setSelectedTasks(prev =>
      prev.includes(taskId)
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };

  if (isFocusMode) {
    const selectedTaskObjects = prioritizedTasks.filter(t => selectedTasks.includes(t.id));
    return (
      <FocusMode
        tasks={selectedTaskObjects}
        onComplete={completeTask}
        onExit={exitFocusMode}
      />
    );
  }

  return (
    <div className="focus-sprint-container">
      <div className="focus-sprint-header">
        <Zap size={28} className="header-icon" />
        <div>
          <h2>AI-Powered Focus Sprint</h2>
          <p>Let AI choose your most important tasks</p>
        </div>
      </div>
      
      {suggestions.length > 0 && (
        <div className="ai-suggestion">
          <span className="suggestion-icon">🤖</span>
          <p>{suggestions[0]}</p>
        </div>
      )}
      
      <TaskSelector
        tasks={prioritizedTasks}
        isAnalyzing={isAnalyzing}
        selectedTasks={selectedTasks}
        onSelectTask={toggleTaskSelection}
      />
      
      <button
        onClick={startSprint}
        className="start-sprint-btn"
        disabled={selectedTasks.length === 0}
      >
        🚀 Start Focus Sprint ({selectedTasks.length} tasks)
      </button>
      
      <SprintHistory sessions={sessions} />
    </div>
  );
}

export default FocusSprint;