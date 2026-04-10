import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Circle, Star, Trash2, Calendar, Flag } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useStore } from '../../../app/store/store';

function TodoCard({ todo, viewMode = 'list' }) {
  const { updateTodo, deleteTodo, toggleComplete, toggleFavorite } = useStore();

  const priorityColors = {
    high: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    medium: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
    low: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  };

  const isOverdue = todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed;

  if (viewMode === 'grid') {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-gray-700"
      >
        <div className="flex items-start justify-between mb-3">
          <button onClick={() => toggleComplete(todo.id)}>
            {todo.completed ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <Circle className="w-5 h-5 text-gray-400" />
            )}
          </button>
          <button
            onClick={() => toggleFavorite(todo.id)}
            className={`p-1 rounded transition ${todo.favorite ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'}`}
          >
            <Star size={16} fill={todo.favorite ? 'currentColor' : 'none'} />
          </button>
        </div>
        
        <h3 className={`font-medium mb-2 ${todo.completed ? 'line-through text-gray-400' : ''}`}>
          {todo.title}
        </h3>
        
        {todo.description && (
          <p className="text-sm text-gray-500 mb-3 line-clamp-2">{todo.description}</p>
        )}
        
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`text-xs px-2 py-0.5 rounded-full capitalize flex items-center gap-1 ${priorityColors[todo.priority]}`}>
            <Flag size={12} />
            {todo.priority}
          </span>
          
          {todo.dueDate && (
            <span className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1 ${
              isOverdue ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'
            }`}>
              <Calendar size={12} />
              {formatDistanceToNow(new Date(todo.dueDate), { addSuffix: true })}
            </span>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ x: 5 }}
      className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-gray-700 group"
    >
      <div className="flex items-center gap-3">
        <button onClick={() => toggleComplete(todo.id)}>
          {todo.completed ? (
            <CheckCircle className="w-5 h-5 text-green-500" />
          ) : (
            <Circle className="w-5 h-5 text-gray-400 group-hover:text-purple-500 transition" />
          )}
        </button>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className={`font-medium ${todo.completed ? 'line-through text-gray-400' : ''}`}>
              {todo.title}
            </h3>
            <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${priorityColors[todo.priority]}`}>
              {todo.priority}
            </span>
            {todo.favorite && <Star size={14} className="text-yellow-500 fill-current" />}
          </div>
          
          {todo.description && (
            <p className="text-sm text-gray-500 mt-1">{todo.description}</p>
          )}
          
          <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
            {todo.dueDate && (
              <span className={`flex items-center gap-1 ${isOverdue ? 'text-red-500' : ''}`}>
                <Calendar size={12} />
                {formatDistanceToNow(new Date(todo.dueDate), { addSuffix: true })}
              </span>
            )}
            <span>Created {formatDistanceToNow(new Date(todo.createdAt), { addSuffix: true })}</span>
          </div>
        </div>
        
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
          <button
            onClick={() => toggleFavorite(todo.id)}
            className={`p-2 rounded transition ${
              todo.favorite ? 'text-yellow-500' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <Star size={16} fill={todo.favorite ? 'currentColor' : 'none'} />
          </button>
          <button
            onClick={() => deleteTodo(todo.id)}
            className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-500 rounded transition"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default TodoCard;