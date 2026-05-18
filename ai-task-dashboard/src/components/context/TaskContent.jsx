import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { generateAITasks, predictTaskCompletion } from '../utils/aiHelpers';

const TaskContext = createContext();

const initialState = {
  tasks: [],
  aiSuggestions: [],
  stats: {
    total: 0,
    completed: 0,
    inProgress: 0,
    todo: 0,
    productivity: 0,
  },
  loading: false,
};

function taskReducer(state, action) {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, { ...action.payload, id: uuidv4(), createdAt: new Date() }],
      };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id ? { ...task, ...action.payload } : task
        ),
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload),
      };
    case 'MOVE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.taskId
            ? { ...task, status: action.payload.newStatus }
            : task
        ),
      };
    case 'SET_AI_SUGGESTIONS':
      return {
        ...state,
        aiSuggestions: action.payload,
      };
    case 'CALCULATE_STATS':
      const total = state.tasks.length;
      const completed = state.tasks.filter(t => t.status === 'completed').length;
      const inProgress = state.tasks.filter(t => t.status === 'in-progress').length;
      const todo = state.tasks.filter(t => t.status === 'todo').length;
      const productivity = total > 0 ? (completed / total) * 100 : 0;
      return {
        ...state,
        stats: { total, completed, inProgress, todo, productivity },
      };
    default:
      return state;
  }
}

export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  const addTask = useCallback((task) => {
    dispatch({ type: 'ADD_TASK', payload: task });
    dispatch({ type: 'CALCULATE_STATS' });
  }, []);

  const updateTask = useCallback((task) => {
    dispatch({ type: 'UPDATE_TASK', payload: task });
    dispatch({ type: 'CALCULATE_STATS' });
  }, []);

  const deleteTask = useCallback((taskId) => {
    dispatch({ type: 'DELETE_TASK', payload: taskId });
    dispatch({ type: 'CALCULATE_STATS' });
  }, []);

  const moveTask = useCallback((taskId, newStatus) => {
    dispatch({ type: 'MOVE_TASK', payload: { taskId, newStatus } });
    dispatch({ type: 'CALCULATE_STATS' });
  }, []);

  const generateAISuggestions = useCallback(() => {
    const suggestions = generateAITasks(state.tasks);
    dispatch({ type: 'SET_AI_SUGGESTIONS', payload: suggestions });
  }, [state.tasks]);

  return (
    <TaskContext.Provider value={{
      ...state,
      addTask,
      updateTask,
      deleteTask,
      moveTask,
      generateAISuggestions,
    }}>
      {children}
    </TaskContext.Provider>
  );
}

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};