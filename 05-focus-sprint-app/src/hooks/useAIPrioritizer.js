import { useState, useEffect } from 'react';
import { aiEngine } from '../services/aiEngine';

function useAIPrioritizer(todos, userHistory = null) {
  const [prioritizedTasks, setPrioritizedTasks] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    if (todos && todos.length > 0) {
      setIsAnalyzing(true);
      
      // Simulate AI processing time
      const timeout = setTimeout(() => {
        const activeTasks = todos.filter(t => !t.completed);
        const topTasks = aiEngine.getTopTasks(activeTasks, 3, userHistory);
        setPrioritizedTasks(topTasks);
        
        const message = aiEngine.getMotivationalMessage(topTasks);
        setSuggestions([message]);
        
        setIsAnalyzing(false);
      }, 500);
      
      return () => clearTimeout(timeout);
    }
  }, [todos, userHistory]);

  return { prioritizedTasks, suggestions, isAnalyzing };
}

export default useAIPrioritizer;