import { useState, useMemo } from 'react';
import { useStore } from '../../../app/store/store';
import { todoService } from '../services/todoService';

export function useTodos() {
  const { todos } = useStore();
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAndSortedTodos = useMemo(() => {
    let filtered = todoService.filterTodos(todos, filter);
    filtered = todoService.searchTodos(filtered, searchQuery);
    filtered = todoService.sortTodos(filtered, sortBy);
    return filtered;
  }, [todos, filter, sortBy, searchQuery]);

  return {
    todos: filteredAndSortedTodos,
    filter,
    setFilter,
    sortBy,
    setSortBy,
    searchQuery,
    setSearchQuery,
    totalTodos: todos.length,
    completedTodos: todos.filter(t => t.completed).length,
  };
}