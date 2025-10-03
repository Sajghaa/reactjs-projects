import { useState, useRef, useEffect } from "react";

export default function StopwatchTimer() {
  const [mode, setMode] = useState("stopwatch"); // stopwatch | timer
  const [time, setTime] = useState(0); // ms for stopwatch, seconds for timer
  const [running, setRunning] = useState(false);
  const [duration, setDuration] = useState(0); // For timer max time
  const [alerted, setAlerted] = useState(false); // Prevent double alert

  const intervalRef = useRef(null);
  const inputRef = useRef();

  const formatStopwatch = (ms) => {
    let totalSeconds = Math.floor(ms / 1000);
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    let millis = Math.floor((ms % 1000) / 10);

    return (
      String(minutes).padStart(2, "0") +
      ":" +
      String(seconds).padStart(2, "0") +
      ":" +
      String(millis).padStart(2, "0")
    );
  };

  const formatTimer = (seconds) => {
    let mins = Math.floor(seconds / 60);
    let secs = seconds % 60;
    return String(mins).padStart(2, "0") + ":" + String(secs).padStart(2, "0");
  };

  const switchMode = (newMode) => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setTime(0);
    setDuration(0);
    setRunning(false);
    setAlerted(false);
    setMode(newMode);
  };

  const start = () => {
    if (running) return;

    if (mode === "stopwatch") {
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 10);
      }, 10);
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
    intervalRef.current = null;
    setRunning(false);
  };

  const reset = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setRunning(false);
    setTime(0);
    setDuration(0);
    setAlerted(false);
    if (mode === "timer" && inputRef.current) {
      inputRef.current.value = "";
    }
  };

  // Watch timer to trigger alert only once
  useEffect(() => {
    if (mode === "timer" && time === 0 && running && !alerted) {
      alert("Time's up!");
      setRunning(false);
      setAlerted(true);
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [time, mode, running, alerted]);

  // Circular Progress Ring
  const radius = 100;
  const circumference = 2 * Math.PI * radius;

  let progress =
    mode === "stopwatch"
      ? (time / 60000) * 100
      : duration > 0
      ? ((duration - time) / duration) * 100
      : 0;

  const strokeDashoffset = circumference - (progress / 100) * circumference;

  // Dynamic ring color: green → yellow → red
  let strokeColor = "#22c55e"; // green
  if (progress > 50 && progress <= 75) strokeColor = "#facc15"; // yellow
  if (progress > 75) strokeColor = "#ef4444"; // red

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 p-6">
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl shadow-purple-700/50 p-8 w-full max-w-md text-center relative">
        <h2 className="text-3xl font-bold text-white mb-6 tracking-wide">
          Stopwatch & Timer
        </h2>

        {/* Mode Switch */}
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

        {/* Circular Progress Ring */}
        <div className="relative flex justify-center items-center mb-6">
          <svg width={220} height={220}>
            <circle
              cx={110}
              cy={110}
              r={radius}
              stroke="#ffffff20"
              strokeWidth={12}
              fill="none"
            />
            <circle
              cx={110}
              cy={110}
              r={radius}
              stroke={strokeColor}
              strokeWidth={12}
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-300 animate-pulse"
            />
          </svg>
          <h1 className="absolute text-6xl font-mono text-white drop-shadow-[0_0_20px_#ff6ec7]">
            {mode === "stopwatch" ? formatStopwatch(time) : formatTimer(time)}
          </h1>
        </div>

        {/* Timer Input */}
        {mode === "timer" && (
          <input
            ref={inputRef}
            type="number"
            placeholder="Enter minutes"
            className="mb-6 px-4 py-2 rounded-lg text-lg text-black w-1/2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        )}

        {/* Controls */}
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
