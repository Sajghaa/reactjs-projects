import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, SortAsc, Plus } from 'lucide-react';
import { useStore } from '../../../app/store/store';
import { useTodos } from '../hooks/useTodos';
import TodoCard from './TodoCard';
import TodoModal from './TodoModal';
import { Button } from '../../../shared/components/Button';
import { Input } from '../../../shared/components/Input';

function TodoList() {
  const { ui, setModalOpen, setView } = useStore();
  const {
    todos,
    filter,
    setFilter,
    sortBy,
    setSortBy,
    searchQuery,
    setSearchQuery,
    totalTodos,
    completedTodos,
  } = useTodos();

  const filters = [
    { id: 'all', label: 'All', count: totalTodos },
    { id: 'active', label: 'Active', count: totalTodos - completedTodos },
    { id: 'completed', label: 'Completed', count: completedTodos },
    { id: 'favorite', label: 'Favorites', count: todos.filter(t => t.favorite).length },
  ];

  const sortOptions = [
    { id: 'date', label: 'Date' },
    { id: 'priority', label: 'Priority' },
    { id: 'alphabetical', label: 'A-Z' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold gradient-text">My Tasks</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            You have {totalTodos - completedTodos} active tasks
          </p>
        </div>
        <Button onClick={() => setModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          New Task
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            id="search-input"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          <Filter className="text-gray-400 mt-2" size={18} />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600"
          >
            {filters.map(f => (
              <option key={f.id} value={f.id}>
                {f.label} ({f.count})
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex gap-2">
          <SortAsc className="text-gray-400 mt-2" size={18} />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600"
          >
            {sortOptions.map(opt => (
              <option key={opt.id} value={opt.id}>
                Sort by {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex gap-2 border-b dark:border-gray-700">
        {['list', 'grid'].map((view) => (
          <button
            key={view}
            onClick={() => setView(view)}
            className={`px-4 py-2 text-sm font-medium transition ${
              ui.view === view
                ? 'text-purple-600 border-b-2 border-purple-600'
                : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            {view === 'list' ? 'List View' : 'Grid View'}
          </button>
        ))}
      </div>

      {/* Todo Grid/List */}
      <div className={ui.view === 'grid' 
        ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
        : 'space-y-3'
      }>
        <AnimatePresence>
          {todos.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center py-12"
            >
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-2">No tasks yet</h3>
              <p className="text-gray-500 mb-4">Create your first task to get started</p>
              <Button onClick={() => setModalOpen(true)}>Create Task</Button>
            </motion.div>
          ) : (
            todos.map((todo, index) => (
              <motion.div
                key={todo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <TodoCard todo={todo} viewMode={ui.view} />
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Todo Modal */}
      <TodoModal />
    </div>
  );
}

export default TodoList;