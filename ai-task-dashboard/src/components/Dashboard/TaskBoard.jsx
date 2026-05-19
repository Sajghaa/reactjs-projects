import React, { useState } from 'react';
import { Box, Typography, Paper, Chip, Button, Dialog, DialogTitle, DialogContent, TextField, MenuItem, DialogActions } from '@mui/material';
import { motion } from 'framer-motion';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Add } from '@mui/icons-material';
import { useTasks } from '../../context/TaskContext';
import TaskCard from '../Tasks/TaskCard';

const columns = [
  { id: 'todo', title: 'To Do', color: '#6C63FF' },
  { id: 'in-progress', title: 'In Progress', color: '#FFB84D' },
  { id: 'review', title: 'Review', color: '#FF6584' },
  { id: 'completed', title: 'Done', color: '#00C9A7' },
];

export default function TaskBoard() {
  const { tasks, moveTask, addTask } = useTasks();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', priority: 'medium', status: 'todo' });

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    moveTask(result.draggableId, result.destination.droppableId);
  };

  const handleAdd = () => {
    if (form.title.trim()) {
      addTask({ ...form, progress: 0, assignee: 'User' });
      setForm({ title: '', description: '', priority: 'medium', status: 'todo' });
      setOpen(false);
    }
  };

  const getTasks = (status) => tasks.filter(t => t.status === status);

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpen(true)}
          sx={{
            background: 'linear-gradient(135deg, #6C63FF, #FF6584)',
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600,
          }}
        >
          Add Task
        </Button>
      </Box>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
          gap: 2,
        }}>
          {columns.map((col, i) => (
            <motion.div
              key={col.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Paper sx={{
                background: 'rgba(20, 25, 40, 0.7)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 3,
                overflow: 'hidden',
                minHeight: 300,
              }}>
                <Box sx={{
                  p: 2,
                  borderBottom: `2px solid ${col.color}`,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: col.color }} />
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: 14 }}>
                      {col.title}
                    </Typography>
                  </Box>
                  <Chip
                    label={getTasks(col.id).length}
                    size="small"
                    sx={{ bgcolor: `${col.color}20`, color: col.color, fontWeight: 600 }}
                  />
                </Box>
                <Droppable droppableId={col.id}>
                  {(provided, snapshot) => (
                    <Box
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      sx={{
                        p: 1.5,
                        minHeight: 250,
                        bgcolor: snapshot.isDraggingOver ? 'rgba(108,99,255,0.05)' : 'transparent',
                        transition: 'background 0.2s',
                      }}
                    >
                      {getTasks(col.id).map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided) => (
                            <Box
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              sx={{ mb: 1.5 }}
                            >
                              <TaskCard task={task} />
                            </Box>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </Box>
                  )}
                </Droppable>
              </Paper>
            </motion.div>
          ))}
        </Box>
      </DragDropContext>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth
        PaperProps={{ sx: { background: '#1a1f2e', borderRadius: 3 } }}>
        <DialogTitle sx={{ fontWeight: 700 }}>Create Task</DialogTitle>
        <DialogContent>
          <TextField fullWidth label="Title" value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            sx={{ mb: 2, mt: 1 }} />
          <TextField fullWidth label="Description" multiline rows={3} value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            sx={{ mb: 2 }} />
          <TextField fullWidth select label="Priority" value={form.priority}
            onChange={e => setForm({ ...form, priority: e.target.value })}
            sx={{ mb: 2 }}>
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleAdd} variant="contained"
            sx={{ background: 'linear-gradient(135deg, #6C63FF, #FF6584)' }}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}