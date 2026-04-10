import { useEffect } from 'react';
import { useStore } from '../../app/store/store';

export function useKeyboardShortcuts() {
  const { addTodo, setModalOpen, deleteAllCompleted } = useStore();

  useEffect(() => {
    const handleKeyPress = (e) => {
      // Ctrl/Cmd + N: New task
      if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        setModalOpen(true);
      }
      
      // Ctrl/Cmd + K: Search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('search-input')?.focus();
      }
      
      // Ctrl/Cmd + Delete: Clear completed
      if ((e.ctrlKey || e.metaKey) && e.key === 'Delete') {
        e.preventDefault();
        if (confirm('Delete all completed tasks?')) {
          deleteAllCompleted();
        }
      }
      
      // Escape: Close modal
      if (e.key === 'Escape') {
        setModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [addTodo, setModalOpen, deleteAllCompleted]);
}