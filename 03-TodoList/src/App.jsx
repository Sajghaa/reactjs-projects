import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const isInitialMount = useRef(true);

  
  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) {
      setTasks(JSON.parse(saved));
    }
  }, []);


  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    const text = input.trim();
    if (text === "") {
      alert("Please enter a new task");
      return;
    }
    setTasks((prev) => [...prev, { text, completed: false }]);
    setInput("");
  };

  const toggleTask = (index) => {
    setTasks((prev) =>
      prev.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (index) => {
    setTasks((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white p-6">
      <motion.h1
        className="text-4xl font-extrabold mb-8 text-blue-400 tracking-wide"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
         Modern To-Do App
      </motion.h1>

      <div className="flex gap-3 mb-8">
        <input
          type="text"
          placeholder="Enter a new task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="px-4 py-2 w-72 rounded-xl bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg"
        />
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={addTask}
          className="px-4 py-2 bg-blue-600 rounded-xl hover:bg-blue-700 transition shadow-lg"
        >
          Add
        </motion.button>
      </div>

      <ul className="w-full max-w-md space-y-3">
        <AnimatePresence>
          {tasks.length === 0 ? (
            <motion.p
              className="text-gray-400 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              No tasks yet. Add one! 
            </motion.p>
          ) : (
            tasks.map((task, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                onClick={() => toggleTask(index)}
                className={`flex justify-between items-center px-4 py-3 rounded-xl cursor-pointer shadow-md ${
                  task.completed
                    ? "line-through bg-gray-700 text-gray-400"
                    : "bg-gray-800 hover:bg-gray-700"
                }`}
              >
                <span>{task.text}</span>
                <motion.button
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteTask(index);
                  }}
                  className="text-red-500 hover:text-red-600 font-bold"
                >
                  ✕
                </motion.button>
              </motion.li>
            ))
          )}
        </AnimatePresence>
      </ul>

      {tasks.length > 0 && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => setTasks([])}
          className="mt-10 px-6 py-2 rounded-xl bg-red-600 hover:bg-red-700 shadow-lg"
        >
          Clear All
        </motion.button>
      )}
    </div>
  );
}
