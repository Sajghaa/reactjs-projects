import { useState, useEffect, useCallback } from 'react';

function useTimer(initialMinutes = 25) {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      setIsComplete(true);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const start = useCallback(() => {
    setIsRunning(true);
    setIsComplete(false);
  }, []);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const reset = useCallback((minutes = initialMinutes) => {
    setTimeLeft(minutes * 60);
    setIsRunning(false);
    setIsComplete(false);
  }, [initialMinutes]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return { minutes, seconds, isRunning, isComplete, start, pause, reset, timeLeft };
}

export default useTimer;