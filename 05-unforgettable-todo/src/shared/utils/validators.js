export const validateTodo = (todo) => {
  const errors = {};
  
  if (!todo.title || todo.title.trim().length === 0) {
    errors.title = 'Title is required';
  } else if (todo.title.length > 100) {
    errors.title = 'Title must be less than 100 characters';
  }
  
  if (todo.dueDate && new Date(todo.dueDate) < new Date()) {
    errors.dueDate = 'Due date cannot be in the past';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};