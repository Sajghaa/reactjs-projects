import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  FormControl,
  Select,
  MenuItem,
  Chip,
  IconButton,
  Button,
  Grid,
  ToggleButtonGroup,
  ToggleButton,
  Paper,
} from '@mui/material';
import {
  Search,
  FilterList,
  SortByAlpha,
  ViewList,
  ViewModule,
  Clear,
  Add,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import TaskCard from './TaskCard';
import TaskForm from './TaskForm';
import { useTaskContext } from '../../context/TaskContext';

const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'priority', label: 'Priority' },
  { value: 'name', label: 'Name' },
];

const filterOptions = [
  { value: 'all', label: 'All Tasks' },
  { value: 'todo', label: 'To Do' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'review', label: 'Review' },
  { value: 'completed', label: 'Completed' },
  { value: 'high', label: 'High Priority' },
];

function TaskList() {
  const { tasks, addTask, updateTask, deleteTask } = useTaskContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');
  const [formOpen, setFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const filteredAndSortedTasks = useMemo(() => {
    let result = [...tasks];

    // Filter
    if (filter !== 'all') {
      if (['todo', 'in-progress', 'review', 'completed'].includes(filter)) {
        result = result.filter(task => task.status === filter);
      } else if (filter === 'high') {
        result = result.filter(task => task.priority === 'high');
      }
    }

    // Search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(task =>
        task.title.toLowerCase().includes(term) ||
        task.description?.toLowerCase().includes(term) ||
        task.assignee?.toLowerCase().includes(term)
      );
    }

    // Sort
    switch (sortBy) {
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'oldest':
        result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'priority':
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        result.sort((a, b) => (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0));
        break;
      case 'name':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    return result;
  }, [tasks, filter, searchTerm, sortBy]);

  const handleAddTask = (taskData) => {
    addTask(taskData);
  };

  const handleEditTask = (taskData) => {
    updateTask(taskData);
  };

  const handleOpenEdit = (task) => {
    setEditingTask(task);
    setFormOpen(true);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
    setEditingTask(null);
  };

  const handleSubmit = (taskData) => {
    if (editingTask) {
      handleEditTask(taskData);
    } else {
      handleAddTask(taskData);
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilter('all');
    setSortBy('newest');
  };

  const hasActiveFilters = searchTerm || filter !== 'all' || sortBy !== 'newest';

  return (
    <Box>
      {/* Header Controls */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Paper
          sx={{
            p: 2,
            mb: 3,
            background: 'rgba(20, 20, 40, 0.6)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: 3,
          }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ opacity: 0.5 }} />
                    </InputAdornment>
                  ),
                  endAdornment: searchTerm && (
                    <InputAdornment position="end">
                      <IconButton size="small" onClick={() => setSearchTerm('')}>
                        <Clear sx={{ fontSize: 18 }} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
                  },
                }}
              />
            </Grid>

            <Grid item xs={6} md={2}>
              <FormControl fullWidth size="small">
                <Select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  displayEmpty
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(255,255,255,0.2)',
                    },
                  }}
                >
                  {filterOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6} md={2}>
              <FormControl fullWidth size="small">
                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  displayEmpty
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(255,255,255,0.2)',
                    },
                  }}
                >
                  {sortOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6} md={2}>
              <ToggleButtonGroup
                value={viewMode}
                exclusive
                onChange={(e, value) => value && setViewMode(value)}
                size="small"
                sx={{
                  '& .MuiToggleButton-root': {
                    borderColor: 'rgba(255,255,255,0.2)',
                    color: 'white',
                    '&.Mui-selected': {
                      background: 'rgba(108, 99, 255, 0.2)',
                    },
                  },
                }}
              >
                <ToggleButton value="grid">
                  <ViewModule />
                </ToggleButton>
                <ToggleButton value="list">
                  <ViewList />
                </ToggleButton>
              </ToggleButtonGroup>
            </Grid>

            <Grid item xs={6} md={2}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                {hasActiveFilters && (
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={clearFilters}
                    sx={{
                      borderColor: 'rgba(255,255,255,0.2)',
                      color: 'white',
                    }}
                  >
                    Clear
                  </Button>
                )}
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  onClick={() => setFormOpen(true)}
                  sx={{
                    background: 'linear-gradient(135deg, #6C63FF 0%, #FF6584 100%)',
                    borderRadius: 2,
                    fontWeight: 600,
                  }}
                >
                  Add Task
                </Button>
              </Box>
            </Grid>
          </Grid>

          {/* Active Filters */}
          {hasActiveFilters && (
            <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
              {searchTerm && (
                <Chip
                  icon={<Search />}
                  label={`Search: "${searchTerm}"`}
                  onDelete={() => setSearchTerm('')}
                  size="small"
                />
              )}
              {filter !== 'all' && (
                <Chip
                  icon={<FilterList />}
                  label={`Filter: ${filter}`}
                  onDelete={() => setFilter('all')}
                  size="small"
                />
              )}
              {sortBy !== 'newest' && (
                <Chip
                  icon={<SortByAlpha />}
                  label={`Sort: ${sortBy}`}
                  onDelete={() => setSortBy('newest')}
                  size="small"
                />
              )}
            </Box>
          )}
        </Paper>
      </motion.div>

      {/* Tasks Count */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="body2" sx={{ opacity: 0.7 }}>
          Showing {filteredAndSortedTasks.length} of {tasks.length} tasks
        </Typography>
      </Box>

      {/* Task Grid/List */}
      <AnimatePresence mode="wait">
        {filteredAndSortedTasks.length > 0 ? (
          <motion.div
            key="tasks"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Grid container spacing={2}>
              {filteredAndSortedTasks.map((task, index) => (
                <Grid
                  item
                  xs={12}
                  sm={viewMode === 'list' ? 12 : 6}
                  md={viewMode === 'list' ? 12 : 4}
                  lg={viewMode === 'list' ? 12 : 3}
                  key={task.id}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <TaskCard
                      task={task}
                      onEdit={handleOpenEdit}
                      onDelete={deleteTask}
                    />
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            style={{ textAlign: 'center', padding: '60px 20px' }}
          >
            <Typography variant="h6" sx={{ opacity: 0.5, mb: 1 }}>
              📋 No tasks found
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.4, mb: 3 }}>
              {hasActiveFilters
                ? 'Try adjusting your filters or search terms'
                : 'Create your first task to get started'}
            </Typography>
            {!hasActiveFilters && (
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => setFormOpen(true)}
                sx={{
                  background: 'linear-gradient(135deg, #6C63FF 0%, #FF6584 100%)',
                  borderRadius: 2,
                  fontWeight: 600,
                }}
              >
                Create Task
              </Button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Task Form Modal */}
      <TaskForm
        open={formOpen}
        onClose={handleCloseForm}
        onSubmit={handleSubmit}
        initialData={editingTask || {}}
      />
    </Box>
  );
}

export default TaskList;