import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

const TaskContext = createContext();

const initialState = {
  tasks: [
    {
      id: '1',
      title: 'Design new dashboard layout',
      description: 'Create wireframes and mockups for the new analytics dashboard',
      priority: 'high',
      status: 'in-progress',
      progress: 75,
      assignee: 'Alex',
      comments: 3,
      attachments: 2,
      createdAt: new Date('2024-01-15'),
      dueDate: '2024-02-01',
      labels: ['design', 'feature'],
    },
    {
      id: '2',
      title: 'Implement user authentication',
      description: 'Set up OAuth2.0 with Google and GitHub providers',
      priority: 'high',
      status: 'todo',
      progress: 0,
      assignee: 'Sarah',
      comments: 5,
      attachments: 1,
      createdAt: new Date('2024-01-16'),
      dueDate: '2024-02-05',
      labels: ['feature', 'security'],
    },
    {
      id: '3',
      title: 'Write API documentation',
      description: 'Document all REST endpoints with examples',
      priority: 'medium',
      status: 'review',
      progress: 90,
      assignee: 'Mike',
      comments: 2,
      attachments: 3,
      createdAt: new Date('2024-01-14'),
      dueDate: '2024-01-30',
      labels: ['documentation'],
    },
    {
      id: '4',
      title: 'Fix navigation bug on mobile',
      description: 'Menu doesn\'t close properly on iOS devices',
      priority: 'medium',
      status: 'in-progress',
      progress: 45,
      assignee: 'Alex',
      comments: 1,
      attachments: 0,
      createdAt: new Date('2024-01-17'),
      dueDate: '2024-01-25',
      labels: ['bug'],
    },
    {
      id: '5',
      title: 'Update dependencies',
      description: 'Update React to v19 and fix breaking changes',
      priority: 'low',
      status: 'completed',
      progress: 100,
      assignee: 'Sarah',
      comments: 0,
      attachments: 1,
      createdAt: new Date('2024-01-10'),
      dueDate: '2024-01-20',
      labels: ['maintenance'],
    },
  ],
  aiSuggestions: [],
  stats: {
    total: 5,
    completed: 1,
    inProgress: 2,
    todo: 1,
    productivity: 20,
  },
  loading: false,
};

function taskReducer(state, action) {
  switch (action.type) {
    case 'ADD_TASK':
      const newTask = {
        ...action.payload,
        id: uuidv4(),
        createdAt: new Date(),
        comments: 0,
        attachments: 0,
        progress: 0,
      };
      return {
        ...state,
        tasks: [...state.tasks, newTask],
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
      const review = state.tasks.filter(t => t.status === 'review').length;
      const productivity = total > 0 ? (completed / total) * 100 : 0;
      return {
        ...state,
        stats: { total, completed, inProgress, todo, review, productivity },
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
    // Import dynamically to avoid circular dependency
    import('../utils/aiHelpers').then(({ generateAITasks }) => {
      const suggestions = generateAITasks(state.tasks);
      dispatch({ type: 'SET_AI_SUGGESTIONS', payload: suggestions });
    });
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