import React, { useState } from 'react';
import { Modal } from '../../../shared/components/Modal';
import { Input } from '../../../shared/components/Input';
import { Button } from '../../../shared/components/Button';
import { useStore } from '../../../app/store/store';
import toast from 'react-hot-toast';

function TodoModal() {
  const { ui, setModalOpen, addTodo } = useStore();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast.error('Please enter a title');
      return;
    }
    
    addTodo(formData);
    toast.success('Task created successfully!');
    setModalOpen(false);
    setFormData({
      title: '',
      description: '',
      priority: 'medium',
      dueDate: '',
    });
  };

  return (
    <Modal
      isOpen={ui.modalOpen}
      onClose={() => setModalOpen(false)}
      title="Create New Task"
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Title *"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="What needs to be done?"
          autoFocus
        />
        
        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows="3"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600"
            placeholder="Add details..."
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Priority</label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="high">🔥 High</option>
              <option value="medium">📌 Medium</option>
              <option value="low">💤 Low</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Due Date</label>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
        </div>
        
        <div className="flex gap-3 pt-4">
          <Button type="submit" className="flex-1">
            Create Task
          </Button>
          <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default TodoModal;