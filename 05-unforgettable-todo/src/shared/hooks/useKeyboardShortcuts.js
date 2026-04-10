import { useEffect } from 'react';
import { useStore } from '../../app/store/store';

export function useKeyboardShortcuts() {
  const { setModalOpen, deleteAllCompleted } = useStore();

  useEffect(() => {
    const handleKeyPress = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        setModalOpen(true);
      }
      
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('search-input')?.focus();
      }
      
      if ((e.ctrlKey || e.metaKey) && e.key === 'Delete') {
        e.preventDefault();
        if (confirm('Delete all completed tasks?')) {
          deleteAllCompleted();
        }
      }
      
      if (e.key === 'Escape') {
        setModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [setModalOpen, deleteAllCompleted]);
}