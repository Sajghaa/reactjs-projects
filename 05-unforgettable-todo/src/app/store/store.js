import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

const initialState = {
  todos: [],
  user: {
    name: 'User',
    avatar: null,
    preferences: {
      theme: 'light',
      notifications: true,
      soundEffects: true,
    },
  },
  ui: {
    sidebarOpen: true,
    modalOpen: false,
    selectedTodo: null,
    view: 'list', // list, grid, kanban
  },
  stats: {
    totalTasks: 0,
    completedTasks: 0,
    streak: 0,
    lastActive: null,
  },
};

export const useStore = create(
  persist(
    immer((set, get) => ({
      ...initialState,
      
      // Todo Actions
      addTodo: (todo) => {
        set((state) => {
          const newTodo = {
            id: crypto.randomUUID(),
            ...todo,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            completed: false,
            favorite: false,
            tags: todo.tags || [],
            subtasks: todo.subtasks || [],
          };
          state.todos.unshift(newTodo);
          state.stats.totalTasks = state.todos.length;
          state.stats.completedTasks = state.todos.filter(t => t.completed).length;
        });
      },
      
      updateTodo: (id, updates) => {
        set((state) => {
          const index = state.todos.findIndex(t => t.id === id);
          if (index !== -1) {
            state.todos[index] = {
              ...state.todos[index],
              ...updates,
              updatedAt: new Date().toISOString(),
            };
            state.stats.completedTasks = state.todos.filter(t => t.completed).length;
          }
        });
      },
      
      deleteTodo: (id) => {
        set((state) => {
          state.todos = state.todos.filter(t => t.id !== id);
          state.stats.totalTasks = state.todos.length;
          state.stats.completedTasks = state.todos.filter(t => t.completed).length;
        });
      },
      
      toggleComplete: (id) => {
        set((state) => {
          const todo = state.todos.find(t => t.id === id);
          if (todo) {
            todo.completed = !todo.completed;
            if (todo.completed) {
              todo.completedAt = new Date().toISOString();
              // Update streak
              const today = new Date().toDateString();
              if (state.stats.lastActive !== today) {
                state.stats.streak++;
                state.stats.lastActive = today;
              }
            }
            state.stats.completedTasks = state.todos.filter(t => t.completed).length;
          }
        });
      },
      
      toggleFavorite: (id) => {
        set((state) => {
          const todo = state.todos.find(t => t.id === id);
          if (todo) todo.favorite = !todo.favorite;
        });
      },
      
      // Bulk Actions
      deleteAllCompleted: () => {
        set((state) => {
          state.todos = state.todos.filter(t => !t.completed);
          state.stats.totalTasks = state.todos.length;
          state.stats.completedTasks = 0;
        });
      },
      
      // UI Actions
      setView: (view) => {
        set((state) => {
          state.ui.view = view;
        });
      },
      
      setModalOpen: (isOpen, todo = null) => {
        set((state) => {
          state.ui.modalOpen = isOpen;
          state.ui.selectedTodo = todo;
        });
      },
      
      // Theme Actions
      toggleTheme: () => {
        set((state) => {
          state.user.preferences.theme = 
            state.user.preferences.theme === 'light' ? 'dark' : 'light';
          
          // Apply theme to DOM
          if (state.user.preferences.theme === 'dark') {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        });
      },
      
      // Analytics
      getStats: () => {
        const state = get();
        const completedThisWeek = state.todos.filter(t => {
          if (!t.completedAt) return false;
          const weekAgo = new Date();
          weekAgo.setDate(weekAgo.getDate() - 7);
          return new Date(t.completedAt) > weekAgo;
        }).length;
        
        return {
          ...state.stats,
          completedThisWeek,
          productivity: state.stats.totalTasks === 0 ? 0 : 
            (state.stats.completedTasks / state.stats.totalTasks) * 100,
        };
      },
    })),
    {
      name: 'unforgettable-todo',
      getStorage: () => localStorage,
    }
  )
);