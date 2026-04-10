export const todoService = {
  filterTodos: (todos, filter) => {
    switch (filter) {
      case 'active':
        return todos.filter(t => !t.completed);
      case 'completed':
        return todos.filter(t => t.completed);
      case 'favorite':
        return todos.filter(t => t.favorite);
      default:
        return todos;
    }
  },

  sortTodos: (todos, sortBy) => {
    const sorted = [...todos];
    switch (sortBy) {
      case 'date':
        return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case 'priority':
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return sorted.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
      case 'alphabetical':
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      default:
        return sorted;
    }
  },

  searchTodos: (todos, query) => {
    if (!query) return todos;
    const lowerQuery = query.toLowerCase();
    return todos.filter(t => 
      t.title.toLowerCase().includes(lowerQuery) ||
      t.description?.toLowerCase().includes(lowerQuery)
    );
  },
};