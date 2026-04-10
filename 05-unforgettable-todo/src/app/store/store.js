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
    },
  },
  ui: {
    sidebarOpen: true,
    modalOpen: false,
    selectedTodo: null,
    view: 'list',
  },
  stats: {
    totalTasks: 0,
    completedTasks: 0,
    streak: 0,
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

      deleteAllCompleted: () => {
        set((state) => {
          state.todos = state.todos.filter(t => !t.completed);
          state.stats.totalTasks = state.todos.length;
          state.stats.completedTasks = 0;
        });
      },

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

      toggleTheme: () => {
        set((state) => {
          state.user.preferences.theme = state.user.preferences.theme === 'light' ? 'dark' : 'light';
          if (state.user.preferences.theme === 'dark') {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        });
      },

      getStats: () => {
        const state = get();
        return {
          ...state.stats,
          productivity: state.stats.totalTasks === 0 ? 0 : 
            (state.stats.completedTasks / state.stats.totalTasks) * 100,
        };
      },
    })),
    {
      name: 'unforgettable-todo',
    }
  )
);