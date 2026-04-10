import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LayoutGrid, Clock, BarChart3, Sun, Moon } from 'lucide-react';
import { useStore } from '../app/store/store';
import { useKeyboardShortcuts } from '../shared/hooks/useKeyboardShortcuts';

function MainLayout({ children, onViewChange, currentView }) {
  const { user, toggleTheme } = useStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  useKeyboardShortcuts();

  const navItems = [
    { id: 'todos', label: 'My Tasks', icon: LayoutGrid },
    { id: 'focus', label: 'Focus Timer', icon: Clock },
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 glass border-b border-gray-200 dark:border-gray-700 z-50">
        <div className="px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">Z</span>
              </div>
              <h1 className="text-xl font-bold gradient-text">ZenFlow</h1>
            </div>
          </div>
          
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            {user.preferences.theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>
      </nav>
      
      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: 'spring', damping: 20 }}
            className="fixed left-0 top-16 bottom-0 w-64 glass border-r border-gray-200 dark:border-gray-700 z-40"
          >
            <div className="p-4 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onViewChange(item.id)}
                    className={`w-full px-3 py-2 rounded-lg flex items-center gap-3 transition ${
                      isActive
                        ? 'gradient-bg text-white shadow-lg'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
      
      {/* Main Content */}
      <main className={`pt-16 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}

export default MainLayout;