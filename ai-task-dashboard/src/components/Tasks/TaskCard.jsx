import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Box,
  Typography,
  IconButton,
  Chip,
  Avatar,
  AvatarGroup,
  LinearProgress,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  MoreVert,
  Edit,
  Delete,
  ContentCopy,
  Archive,
  Flag,
  AccessTime,
  Comment,
  Attachment,
  CheckCircle,
  PlayArrow,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useTaskContext } from '../../context/TaskContext';

const priorityColors = {
  high: { bg: 'rgba(255, 72, 66, 0.1)', color: '#FF4842', border: 'rgba(255, 72, 66, 0.3)' },
  medium: { bg: 'rgba(255, 184, 77, 0.1)', color: '#FFB84D', border: 'rgba(255, 184, 77, 0.3)' },
  low: { bg: 'rgba(0, 201, 167, 0.1)', color: '#00C9A7', border: 'rgba(0, 201, 167, 0.3)' },
};

const statusIcons = {
  'todo': <Flag sx={{ fontSize: 16 }} />,
  'in-progress': <PlayArrow sx={{ fontSize: 16 }} />,
  'review': <CheckCircle sx={{ fontSize: 16 }} />,
  'completed': <CheckCircle sx={{ fontSize: 16 }} />,
};

function TaskCard({ task, onEdit, onDelete }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const { updateTask, deleteTask } = useTaskContext();
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleStatusChange = (newStatus) => {
    updateTask({ ...task, status: newStatus });
    handleClose();
  };

  const handleDelete = () => {
    deleteTask(task.id);
    handleClose();
  };

  const getDaysRemaining = () => {
    if (!task.dueDate) return null;
    const due = new Date(task.dueDate);
    const now = new Date();
    const diff = Math.ceil((due - now) / (1000 * 60 * 60 * 24));
    return diff;
  };

  const daysRemaining = getDaysRemaining();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        sx={{
          background: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: 3,
          transition: 'all 0.3s ease',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'visible',
          '&:hover': {
            border: `1px solid ${priorityColors[task.priority]?.border || 'rgba(108, 99, 255, 0.5)'}`,
            boxShadow: '0 8px 32px rgba(108, 99, 255, 0.15)',
          },
          ...(task.priority === 'high' && {
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 3,
              background: 'linear-gradient(90deg, #FF4842, #FF6584)',
              borderRadius: '3px 3px 0 0',
            },
          }),
        }}
        onClick={() => onEdit?.(task)}
      >
        <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
          {/* Header */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 600,
                  mb: 0.5,
                  textDecoration: task.status === 'completed' ? 'line-through' : 'none',
                  opacity: task.status === 'completed' ? 0.6 : 1,
                }}
              >
                {task.title}
              </Typography>
              <Chip
                icon={statusIcons[task.status]}
                label={task.status.replace('-', ' ')}
                size="small"
                sx={{
                  height: 22,
                  fontSize: '0.65rem',
                  fontWeight: 500,
                  background: 'rgba(108, 99, 255, 0.1)',
                  color: '#6C63FF',
                  border: '1px solid rgba(108, 99, 255, 0.2)',
                  textTransform: 'capitalize',
                }}
              />
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Chip
                icon={<Flag sx={{ fontSize: 14 }} />}
                label={task.priority}
                size="small"
                sx={{
                  height: 24,
                  fontSize: '0.65rem',
                  fontWeight: 600,
                  bgcolor: priorityColors[task.priority]?.bg,
                  color: priorityColors[task.priority]?.color,
                  border: `1px solid ${priorityColors[task.priority]?.border}`,
                  textTransform: 'capitalize',
                }}
              />
              <IconButton
                size="small"
                onClick={handleClick}
                sx={{ '&:hover': { background: 'rgba(255,255,255,0.1)' } }}
              >
                <MoreVert sx={{ fontSize: 18 }} />
              </IconButton>
            </Box>
          </Box>

          {/* Description */}
          {task.description && (
            <Typography
              variant="body2"
              sx={{
                opacity: 0.7,
                mb: 2,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                lineHeight: 1.4,
              }}
            >
              {task.description}
            </Typography>
          )}

          {/* Progress Bar */}
          {task.progress !== undefined && task.status !== 'completed' && (
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant="caption" sx={{ opacity: 0.6, fontSize: '0.65rem' }}>
                  Progress
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.6, fontWeight: 600, fontSize: '0.65rem' }}>
                  {task.progress}%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={task.progress}
                sx={{
                  height: 5,
                  borderRadius: 5,
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 5,
                    background: `linear-gradient(90deg, ${priorityColors[task.priority]?.color || '#6C63FF'}, #FF6584)`,
                  },
                }}
              />
            </Box>
          )}

          {/* Footer */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <AvatarGroup
                max={3}
                sx={{
                  '& .MuiAvatar-root': {
                    width: 26,
                    height: 26,
                    fontSize: '0.7rem',
                    border: '2px solid rgba(20, 20, 40, 0.9)',
                  },
                }}
              >
                <Avatar sx={{ bgcolor: '#6C63FF' }}>U</Avatar>
                {task.assignee && (
                  <Avatar sx={{ bgcolor: '#FF6584' }}>
                    {task.assignee[0]}
                  </Avatar>
                )}
                {task.collaborators?.map((collab, index) => (
                  <Avatar key={index} sx={{ bgcolor: '#00C9A7' }}>
                    {collab[0]}
                  </Avatar>
                ))}
              </AvatarGroup>
              {daysRemaining !== null && (
                <Chip
                  icon={<AccessTime sx={{ fontSize: 14 }} />}
                  label={`${daysRemaining}d left`}
                  size="small"
                  color={daysRemaining <= 1 ? 'error' : daysRemaining <= 3 ? 'warning' : 'default'}
                  sx={{
                    height: 22,
                    fontSize: '0.6rem',
                    background: daysRemaining <= 1 
                      ? 'rgba(255, 72, 66, 0.1)' 
                      : 'rgba(255, 255, 255, 0.05)',
                  }}
                />
              )}
            </Box>

            <Box sx={{ display: 'flex', gap: 1.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
                <Comment sx={{ fontSize: 15, opacity: 0.5 }} />
                <Typography variant="caption" sx={{ opacity: 0.5, fontSize: '0.7rem' }}>
                  {task.comments || 0}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
                <Attachment sx={{ fontSize: 15, opacity: 0.5 }} />
                <Typography variant="caption" sx={{ opacity: 0.5, fontSize: '0.7rem' }}>
                  {task.attachments || 0}
                </Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>

        {/* Context Menu */}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          onClick={(e) => e.stopPropagation()}
          PaperProps={{
            sx: {
              background: 'rgba(20, 20, 40, 0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 2,
              minWidth: 200,
              mt: 1,
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={() => { handleStatusChange('in-progress'); handleClose(); }}>
            <ListItemIcon>
              <PlayArrow sx={{ fontSize: 18, color: '#FFB84D' }} />
            </ListItemIcon>
            <ListItemText>Move to In Progress</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => { handleStatusChange('review'); handleClose(); }}>
            <ListItemIcon>
              <CheckCircle sx={{ fontSize: 18, color: '#FF6584' }} />
            </ListItemIcon>
            <ListItemText>Move to Review</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => { handleStatusChange('completed'); handleClose(); }}>
            <ListItemIcon>
              <CheckCircle sx={{ fontSize: 18, color: '#00C9A7' }} />
            </ListItemIcon>
            <ListItemText>Mark as Completed</ListItemText>
          </MenuItem>
          <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />
          <MenuItem onClick={() => { onEdit?.(task); handleClose(); }}>
            <ListItemIcon>
              <Edit sx={{ fontSize: 18 }} />
            </ListItemIcon>
            <ListItemText>Edit</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => { /* Duplicate logic */ handleClose(); }}>
            <ListItemIcon>
              <ContentCopy sx={{ fontSize: 18 }} />
            </ListItemIcon>
            <ListItemText>Duplicate</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => { /* Archive logic */ handleClose(); }}>
            <ListItemIcon>
              <Archive sx={{ fontSize: 18 }} />
            </ListItemIcon>
            <ListItemText>Archive</ListItemText>
          </MenuItem>
          <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />
          <MenuItem onClick={handleDelete} sx={{ color: '#FF4842' }}>
            <ListItemIcon>
              <Delete sx={{ fontSize: 18, color: '#FF4842' }} />
            </ListItemIcon>
            <ListItemText>Delete</ListItemText>
          </MenuItem>
        </Menu>
      </Card>
    </motion.div>
  );
}

export default TaskCard;