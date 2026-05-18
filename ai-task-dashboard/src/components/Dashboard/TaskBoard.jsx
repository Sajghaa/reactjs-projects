import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Chip,
  Avatar,
  AvatarGroup,
  LinearProgress,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  useTheme,
} from '@mui/material';
import {
  MoreVert,
  Add,
  AccessTime,
  Flag,
  Comment,
  Attachment,
  DragIndicator,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useTaskContext } from '../../context/TaskContext';
import TaskCard from '../Tasks/TaskCard';

const columns = [
  { id: 'todo', title: 'To Do', color: '#6C63FF' },
  { id: 'in-progress', title: 'In Progress', color: '#FFB84D' },
  { id: 'review', title: 'Review', color: '#FF6584' },
  { id: 'completed', title: 'Completed', color: '#00C9A7' },
];

const priorityColors = {
  high: '#FF4842',
  medium: '#FFB84D',
  low: '#00C9A7',
};

function TaskBoard({ expanded = false }) {
  const { tasks, moveTask, addTask } = useTaskContext();
  const [openDialog, setOpenDialog] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium',
    status: 'todo',
  });
  const theme = useTheme();

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const { draggableId, destination } = result;
    moveTask(draggableId, destination.droppableId);
  };

  const handleAddTask = () => {
    if (newTask.title.trim()) {
      addTask({
        ...newTask,
        assignee: 'User',
        progress: 0,
        comments: 0,
        attachments: 0,
      });
      setNewTask({ title: '', description: '', priority: 'medium', status: 'todo' });
      setOpenDialog(false);
    }
  };

  const getTasksByStatus = (status) => {
    return tasks.filter(task => task.status === status);
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Task Board
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            Drag and drop tasks to update their status
          </Typography>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05 }}
        >
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setOpenDialog(true)}
            sx={{
              background: 'linear-gradient(135deg, #6C63FF 0%, #FF6584 100%)',
              borderRadius: 3,
              fontWeight: 600,
            }}
          >
            Add Task
          </Button>
        </motion.div>
      </Box>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: expanded
              ? 'repeat(4, 1fr)'
              : { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
            gap: 2,
          }}
        >
          {columns.map((column, columnIndex) => (
            <motion.div
              key={column.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: columnIndex * 0.1 }}
            >
              <Paper
                sx={{
                  background: 'rgba(20, 20, 40, 0.6)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: 4,
                  overflow: 'hidden',
                  minHeight: 400,
                }}
              >
                <Box
                  sx={{
                    p: 2,
                    borderBottom: `2px solid ${column.color}`,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        bgcolor: column.color,
                      }}
                    />
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {column.title}
                    </Typography>
                  </Box>
                  <Chip
                    label={getTasksByStatus(column.id).length}
                    size="small"
                    sx={{
                      background: `${column.color}20`,
                      color: column.color,
                      fontWeight: 600,
                    }}
                  />
                </Box>

                <Droppable droppableId={column.id}>
                  {(provided, snapshot) => (
                    <Box
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      sx={{
                        p: 2,
                        minHeight: 300,
                        transition: 'background-color 0.2s',
                        backgroundColor: snapshot.isDraggingOver
                          ? 'rgba(108, 99, 255, 0.1)'
                          : 'transparent',
                      }}
                    >
                      <AnimatePresence>
                        {getTasksByStatus(column.id).map((task, index) => (
                          <Draggable key={task.id} draggableId={task.id} index={index}>
                            {(provided, snapshot) => (
                              <motion.div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.2 }}
                                style={{
                                  ...provided.draggableProps.style,
                                  marginBottom: 12,
                                }}
                              >
                                <TaskCard task={task} />
                                
                              </motion.div>
                            )}
                          </Draggable>
                        ))}
                      </AnimatePresence>
                      {provided.placeholder}
                    </Box>
                  )}
                </Droppable>
              </Paper>
            </motion.div>
          ))}
        </Box>
      </DragDropContext>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        PaperProps={{
          sx: {
            background: 'rgba(20, 20, 40, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: 4,
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 700 }}>Create New Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Task Title"
            fullWidth
            variant="outlined"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Priority</InputLabel>
            <Select
              value={newTask.priority}
              label="Priority"
              onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
            >
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="high">High</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button
            onClick={handleAddTask}
            variant="contained"
            sx={{
              background: 'linear-gradient(135deg, #6C63FF 0%, #FF6584 100%)',
            }}
          >
            Create Task
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default TaskBoard;