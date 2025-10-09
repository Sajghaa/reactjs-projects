import React, { useEffect, useRef, useState } from "react";

export default function StopwatchTimer() {
  const [mode, setMode] = useState("stopwatch");
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [duration, setDuration] = useState(0);
  const [alerted, setAlerted] = useState(false);
  const [minutePulse, setMinutePulse] = useState(false);

  const inputRef = useRef();
  const intervalRef = useRef();
  const prevMinuteRef = useRef(0);

  const formatStopwatch = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const millis = Math.floor((ms % 1000) / 10);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}:${String(millis).padStart(2, "0")}`;
  };

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const switchMode = (newMode) => {
    clearInterval(intervalRef.current);
    setTime(0);
    setDuration(0);
    setRunning(false);
    setAlerted(false);
    setMinutePulse(false);
    if (mode === "timer" && inputRef.current) inputRef.current.value = "";
    setMode(newMode);
  };

  const start = () => {
    if (running) return;

    if (mode === "stopwatch") {
      const startTime = Date.now() - time;
      intervalRef.current = setInterval(() => {
        setTime(Date.now() - startTime);
      }, 100);
    } else {
      if (time === 0) {
        const input = parseInt(inputRef.current.value) || 0;
        setTime(input * 60);
        setDuration(input * 60);
      }
      intervalRef.current = setInterval(() => {
        setTime((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }

    setRunning(true);
  };

  const pause = () => {
    clearInterval(intervalRef.current);
    setRunning(false);
  };

  const reset = () => {
    clearInterval(intervalRef.current);
    setRunning(false);
    setTime(0);
    setDuration(0);
    setAlerted(false);
    setMinutePulse(false);
    if (mode === "timer" && inputRef.current) inputRef.current.value = "";
  };

  useEffect(() => {
    if (mode === "timer" && time === 0 && running && !alerted) {
      alert("Time's Up!");
      clearInterval(intervalRef.current);
      setRunning(false);
      setAlerted(true);
    }
  }, [mode, time, running, alerted]);

  useEffect(() => {
    if (mode === "stopwatch") {
      const currentMinute = Math.floor(time / 60000);
      if (currentMinute > prevMinuteRef.current) {
        setMinutePulse(true);
        setTimeout(() => setMinutePulse(false), 800); 
        prevMinuteRef.current = currentMinute;
      }
    }
  }, [time, mode]);

 
  const outerRadius = 100;
  const innerRadius = 75;
  const outerCirc = 2 * Math.PI * outerRadius;
  const innerCirc = 2 * Math.PI * innerRadius;

  let outerProgress = 0;
  let innerProgress = 0;

  if (mode === "stopwatch") {
    const msPerMinute = 60000;
    const msPerHour = 3600000;
    outerProgress = ((time % msPerMinute) / msPerMinute) * 100; 
    innerProgress = ((time % msPerHour) / msPerHour) * 100; 
  } else {
    outerProgress = duration > 0 ? ((duration - time) / duration) * 100 : 0;
  }

  const outerOffset = outerCirc - (outerProgress / 100) * outerCirc;
  const innerOffset = innerCirc - (innerProgress / 100) * innerCirc;

  const hue = (outerProgress * 3.6) % 360;
  const strokeColorOuter = `hsl(${hue}, 100%, 60%)`;
  const strokeColorInner = `hsl(${(hue + 120) % 360}, 100%, 50%)`;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 p-6">
      <style>
        {`
        @keyframes pulseInner {
          0%, 100% { stroke-width: 10; filter: drop-shadow(0 0 0px #fff); }
          50% { stroke-width: 16; filter: drop-shadow(0 0 20px #fff); }
        }
        .inner-pulse {
          animation: pulseInner 0.8s ease-in-out;
        }

        @keyframes textGlow {
          0%, 100% { text-shadow: 0 0 20px #f0abfc; }
          50% { text-shadow: 0 0 40px #e879f9; }
        }
        .glow {
          animation: textGlow 2s ease-in-out infinite;
        }
      `}
      </style>

      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl shadow-purple-700/50 p-8 w-full max-w-md text-center relative">
        <h2 className="text-3xl font-bold text-white mb-6 tracking-wide">
          Stopwatch & Timer
        </h2>

     
        <div className="flex justify-center mb-6 gap-4">
          <button
            onClick={() => switchMode("stopwatch")}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              mode === "stopwatch"
                ? "bg-purple-600 text-white shadow-lg"
                : "bg-white/20 text-white hover:bg-white/30"
            }`}
          >
            Stopwatch
          </button>
          <button
            onClick={() => switchMode("timer")}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              mode === "timer"
                ? "bg-purple-600 text-white shadow-lg"
                : "bg-white/20 text-white hover:bg-white/30"
            }`}
          >
            Timer
          </button>
        </div>

    
        <div className="relative flex justify-center items-center mb-6">
          <svg width={240} height={240}>
 
            <circle
              cx={120}
              cy={120}
              r={outerRadius}
              stroke="#ffffff20"
              strokeWidth={12}
              fill="none"
            />
            <circle
              cx={120}
              cy={120}
              r={innerRadius}
              stroke="#ffffff10"
              strokeWidth={10}
              fill="none"
            />

      
            <circle
              cx={120}
              cy={120}
              r={outerRadius}
              stroke={strokeColorOuter}
              strokeWidth={12}
              fill="none"
              strokeDasharray={outerCirc}
              strokeDashoffset={outerOffset}
              strokeLinecap="round"
              className="transition-all duration-300"
            />
            <circle
              cx={120}
              cy={120}
              r={innerRadius}
              stroke={strokeColorInner}
              strokeWidth={10}
              fill="none"
              strokeDasharray={innerCirc}
              strokeDashoffset={innerOffset}
              strokeLinecap="round"
              className={`transition-all duration-300 ${
                minutePulse ? "inner-pulse" : ""
              }`}
            />
          </svg>

          <h1
            className={`absolute text-6xl font-mono text-white ${
              running ? "glow" : ""
            }`}
          >
            {mode === "stopwatch" ? formatStopwatch(time) : formatTimer(time)}
          </h1>
        </div>

 
        {mode === "timer" && (
          <input
            ref={inputRef}
            type="number"
            placeholder="Enter minutes"
            className="mb-6 px-4 py-2 rounded-lg text-lg text-black w-1/2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        )}


        <div className="flex justify-center gap-4">
          <button
            onClick={start}
            className="px-6 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition shadow-lg"
          >
            Start
          </button>
          <button
            onClick={pause}
            className="px-6 py-2 bg-yellow-500 text-white rounded-lg font-semibold hover:bg-yellow-600 transition shadow-lg"
          >
            Pause
          </button>
          <button
            onClick={reset}
            className="px-6 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition shadow-lg"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

