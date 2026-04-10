
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, Sun, Moon, Plus, Search, Bell, User, 
  LayoutGrid, List, Layout, TrendingUp, Star, CheckCircle 
} from 'lucide-react';
import { useStore } from '../app/store/store';
import { useKeyboardShortcuts } from '../shared/hooks/useKeyboardShortcuts';

function MainLayout({ children }) {
  const { ui, user, setView, toggleTheme, setModalOpen } = useStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  useKeyboardShortcuts();

  useEffect(() => {
    // Apply theme on mount
    if (user.preferences.theme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const menuItems = [
    { id: 'all', label: 'All Tasks', icon: Layout, color: 'purple' },
    { id: 'today', label: 'Today', icon: CheckCircle, color: 'blue' },
    { id: 'important', label: 'Important', icon: Star, color: 'red' },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp, color: 'green' },
  ];

  const views = [
    { id: 'list', icon: List, label: 'List' },
    { id: 'grid', icon: LayoutGrid, label: 'Grid' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 z-50">
        <div className="px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">Z</span>
              </div>
              <h1 className="text-xl font-bold gradient-text">ZenFlow</h1>
            </div>
          </div>
          
          <div className="flex-1 max-w-md mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                id="search-input"
                type="text"
                placeholder="Search tasks... (Ctrl+K)"
                className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border-0 rounded-lg focus:ring-2 focus:ring-purple-500 transition"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              {user.preferences.theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            
            <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition">
              <User size={20} />
            </button>
          </div>
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
            className="fixed left-0 top-16 bottom-0 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 z-40"
          >
            <div className="p-4">
              <button
                onClick={() => setModalOpen(true)}
                className="w-full mb-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium flex items-center justify-center gap-2 hover:shadow-lg transition"
              >
                <Plus size={18} />
                New Task
              </button>
              
              <div className="space-y-1">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      className="w-full px-3 py-2 rounded-lg flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition group"
                    >
                      <Icon size={18} className={`text-${item.color}-500`} />
                      <span className="flex-1 text-left">{item.label}</span>
                    </button>
                  );
                })}
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <p className="text-xs text-gray-500 mb-2">View Options</p>
                <div className="flex gap-2">
                  {views.map((view) => {
                    const Icon = view.icon;
                    return (
                      <button
                        key={view.id}
                        onClick={() => setView(view.id)}
                        className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-2 transition ${
                          ui.view === view.id
                            ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                      >
                        <Icon size={16} />
                        <span className="text-sm">{view.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
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
      
      {/* Floating Action Button (Mobile) */}
      <button
        onClick={() => setModalOpen(true)}
        className="fixed bottom-6 right-6 md:hidden w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition"
      >
        <Plus size={24} />
      </button>
    </div>
  );
}

export default MainLayout;