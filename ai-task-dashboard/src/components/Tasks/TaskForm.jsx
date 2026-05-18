import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Chip,
  IconButton,
  Grid,
} from '@mui/material';
import {
  Close,
  Add,
  Schedule,
  AttachFile,
  Flag,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { TextField as MuiTextField } from '@mui/material';

const priorities = [
  { value: 'low', label: 'Low Priority', color: '#00C9A7', icon: '🟢' },
  { value: 'medium', label: 'Medium Priority', color: '#FFB84D', icon: '🟡' },
  { value: 'high', label: 'High Priority', color: '#FF4842', icon: '🔴' },
];

const labels = ['bug', 'feature', 'improvement', 'documentation', 'design'];

function TaskForm({ open, onClose, onSubmit, initialData = {} }) {
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    description: initialData.description || '',
    priority: initialData.priority || 'medium',
    status: initialData.status || 'todo',
    progress: initialData.progress || 0,
    dueDate: initialData.dueDate || null,
    labels: initialData.labels || [],
    assignee: initialData.assignee || '',
    ...initialData,
  });

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleSubmit = () => {
    if (formData.title.trim()) {
      onSubmit({
        ...formData,
        id: initialData.id,
        createdAt: initialData.createdAt || new Date().toISOString(),
      });
      onClose();
    }
  };

  const toggleLabel = (label) => {
    setFormData(prev => ({
      ...prev,
      labels: prev.labels.includes(label)
        ? prev.labels.filter(l => l !== label)
        : [...prev.labels, label],
    }));
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          background: 'rgba(20, 20, 40, 0.98)',
          backdropFilter: 'blur(30px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: 4,
          boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
        },
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <DialogTitle sx={{ m: 0, p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {initialData.id ? 'Edit Task' : 'Create New Task'}
          </Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers sx={{ borderColor: 'rgba(255,255,255,0.1)', py: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                label="Task Title"
                fullWidth
                value={formData.title}
                onChange={handleChange('title')}
                placeholder="What needs to be done?"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'rgba(255,255,255,0.2)',
                    },
                    '&:hover fieldset': {
                      borderColor: '#6C63FF',
                    },
                  },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Description"
                fullWidth
                multiline
                rows={4}
                value={formData.description}
                onChange={handleChange('description')}
                placeholder="Add a detailed description..."
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'rgba(255,255,255,0.2)',
                    },
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Priority</InputLabel>
                <Select
                  value={formData.priority}
                  onChange={handleChange('priority')}
                  label="Priority"
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(255,255,255,0.2)',
                    },
                  }}
                >
                  {priorities.map((priority) => (
                    <MenuItem key={priority.value} value={priority.value}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography>{priority.icon}</Typography>
                        <Typography sx={{ color: priority.color }}>
                          {priority.label}
                        </Typography>
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={formData.status}
                  onChange={handleChange('status')}
                  label="Status"
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(255,255,255,0.2)',
                    },
                  }}
                >
                  <MenuItem value="todo">📋 To Do</MenuItem>
                  <MenuItem value="in-progress">⚡ In Progress</MenuItem>
                  <MenuItem value="review">👀 Review</MenuItem>
                  <MenuItem value="completed">✅ Completed</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Assignee"
                value={formData.assignee}
                onChange={handleChange('assignee')}
                placeholder="Assign to team member"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'rgba(255,255,255,0.2)',
                    },
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="datetime-local"
                label="Due Date"
                value={formData.dueDate || ''}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                InputLabelProps={{ shrink: true }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'rgba(255,255,255,0.2)',
                    },
                  },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                Progress ({formData.progress}%)
              </Typography>
              <Slider
                value={formData.progress}
                onChange={(e, value) => setFormData({ ...formData, progress: value })}
                sx={{
                  color: '#6C63FF',
                  '& .MuiSlider-thumb': {
                    '&:hover, &.Mui-focusVisible': {
                      boxShadow: '0 0 0 8px rgba(108, 99, 255, 0.16)',
                    },
                  },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                Labels
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {labels.map((label) => (
                  <Chip
                    key={label}
                    label={label}
                    onClick={() => toggleLabel(label)}
                    variant={formData.labels.includes(label) ? 'filled' : 'outlined'}
                    sx={{
                      textTransform: 'capitalize',
                      borderColor: 'rgba(255,255,255,0.2)',
                      background: formData.labels.includes(label)
                        ? 'linear-gradient(135deg, #6C63FF, #FF6584)'
                        : 'transparent',
                      '&:hover': {
                        background: formData.labels.includes(label)
                          ? 'linear-gradient(135deg, #7B73FF, #FF7594)'
                          : 'rgba(255,255,255,0.1)',
                      },
                    }}
                  />
                ))}
              </Box>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ p: 3, gap: 1 }}>
          <Button
            onClick={onClose}
            variant="outlined"
            sx={{
              borderColor: 'rgba(255,255,255,0.2)',
              color: 'white',
              '&:hover': {
                borderColor: 'rgba(255,255,255,0.4)',
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={!formData.title.trim()}
            sx={{
              background: 'linear-gradient(135deg, #6C63FF 0%, #FF6584 100%)',
              borderRadius: 2,
              px: 4,
              fontWeight: 600,
              '&:hover': {
                background: 'linear-gradient(135deg, #7B73FF 0%, #FF7594 100%)',
              },
              '&:disabled': {
                background: 'rgba(255,255,255,0.1)',
              },
            }}
          >
            {initialData.id ? 'Update Task' : 'Create Task'}
          </Button>
        </DialogActions>
      </motion.div>
    </Dialog>
  );
}

export default TaskForm;