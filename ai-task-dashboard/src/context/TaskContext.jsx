import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

const TaskContext = createContext();

const initialTasks = [
  {
    id: '1',
    title: 'Design Dashboard UI',
    description: 'Create modern dashboard layout with glass morphism effects',
    status: 'in-progress',
    priority: 'high',
    progress: 70,
    assignee: 'Alex',
    dueDate: '2024-03-01',
    tags: ['design', 'frontend'],
  },
  {
    id: '2',
    title: 'Setup Authentication',
    description: 'Implement JWT auth with refresh tokens',
    status: 'todo',
    priority: 'high',
    progress: 0,
    assignee: 'Sarah',
    dueDate: '2024-03-05',
    tags: ['backend', 'security'],
  },
  {
    id: '3',
    title: 'API Documentation',
    description: 'Document all REST endpoints with Swagger',
    status: 'review',
    priority: 'medium',
    progress: 85,
    assignee: 'Mike',
    dueDate: '2024-02-28',
    tags: ['documentation'],
  },
  {
    id: '4',
    title: 'Fix Mobile Navigation',
    description: 'Menu not closing on mobile devices',
    status: 'in-progress',
    priority: 'medium',
    progress: 40,
    assignee: 'Alex',
    dueDate: '2024-02-25',
    tags: ['bug', 'frontend'],
  },
  {
    id: '5',
    title: 'Database Optimization',
    description: 'Optimize slow queries and add indexes',
    status: 'todo',
    priority: 'low',
    progress: 0,
    assignee: 'Sarah',
    dueDate: '2024-03-10',
    tags: ['backend', 'performance'],
  },
];

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, { ...action.payload, id: uuidv4(), createdAt: new Date() }],
      };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(t => t.id === action.payload.id ? { ...t, ...action.payload } : t),
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(t => t.id !== action.payload),
      };
    case 'MOVE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(t => t.id === action.payload.id ? { ...t, status: action.payload.status } : t),
      };
    default:
      return state;
  }
};

export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, { tasks: initialTasks });

  const addTask = useCallback((task) => dispatch({ type: 'ADD_TASK', payload: task }), []);
  const updateTask = useCallback((task) => dispatch({ type: 'UPDATE_TASK', payload: task }), []);
  const deleteTask = useCallback((id) => dispatch({ type: 'DELETE_TASK', payload: id }), []);
  const moveTask = useCallback((id, status) => dispatch({ type: 'MOVE_TASK', payload: { id, status } }), []);

  const getStats = () => {
    const total = state.tasks.length;
    const completed = state.tasks.filter(t => t.status === 'completed').length;
    const inProgress = state.tasks.filter(t => t.status === 'in-progress').length;
    const todo = state.tasks.filter(t => t.status === 'todo').length;
    const review = state.tasks.filter(t => t.status === 'review').length;
    return { total, completed, inProgress, todo, review };
  };

  return (
    <TaskContext.Provider value={{
      tasks: state.tasks,
      stats: getStats(),
      addTask,
      updateTask,
      deleteTask,
      moveTask,
    }}>
      {children}
    </TaskContext.Provider>
  );
}

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error('useTasks must be used within TaskProvider');
  return context;
};