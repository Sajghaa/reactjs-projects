import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { Button } from '../../../shared/components/Button';

function FocusTimer() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="max-w-md mx-auto text-center space-y-8">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
        <div className="text-7xl font-bold mb-4">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
        <p className="text-lg opacity-90">Focus Session</p>
      </div>
      
      <div className="flex gap-4 justify-center">
        <Button onClick={() => setIsActive(!isActive)}>
          {isActive ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
          {isActive ? 'Pause' : 'Start'}
        </Button>
        <Button variant="outline" onClick={() => {
          setIsActive(false);
          setTimeLeft(25 * 60);
        }}>
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
        <h3 className="font-semibold mb-2">💡 Focus Tips</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Eliminate distractions, work in focused blocks, and take regular breaks
        </p>
      </div>
    </div>
  );
}

export default FocusTimer;