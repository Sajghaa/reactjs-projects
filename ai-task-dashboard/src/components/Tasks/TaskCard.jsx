import React from 'react';
import { Card, CardContent, Typography, Box, Chip, LinearProgress, IconButton, Menu, MenuItem } from '@mui/material';
import { MoreVert, AccessTime, Flag, Edit, Delete } from '@mui/icons-material';
import { useTasks } from '../../context/TaskContext';

const priorityColors = {
  high: '#FF4842',
  medium: '#FFB84D',
  low: '#00C9A7',
};

export default function TaskCard({ task }) {
  const { deleteTask, moveTask } = useTasks();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (e) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => setAnchorEl(null);

  return (
    <Card sx={{
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 2,
      cursor: 'grab',
      transition: 'all 0.2s',
      '&:hover': {
        border: '1px solid rgba(108,99,255,0.3)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
      },
      ...(task.priority === 'high' && {
        borderLeft: '3px solid #FF4842',
      }),
    }}>
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: 13 }}>
            {task.title}
          </Typography>
          <IconButton size="small" onClick={handleMenuOpen}>
            <MoreVert sx={{ fontSize: 16 }} />
          </IconButton>
        </Box>

        <Typography variant="body2" sx={{ opacity: 0.6, fontSize: 12, mb: 1.5, lineHeight: 1.4 }}>
          {task.description}
        </Typography>

        <Box sx={{ display: 'flex', gap: 0.5, mb: 1.5, flexWrap: 'wrap' }}>
          <Chip
            icon={<Flag sx={{ fontSize: 12 }} />}
            label={task.priority}
            size="small"
            sx={{
              height: 22,
              fontSize: 10,
              bgcolor: `${priorityColors[task.priority]}20`,
              color: priorityColors[task.priority],
            }}
          />
          {task.tags?.map(tag => (
            <Chip key={tag} label={tag} size="small" sx={{ height: 22, fontSize: 10 }} />
          ))}
        </Box>

        {task.status !== 'completed' && (
          <Box sx={{ mb: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography variant="caption" sx={{ fontSize: 10, opacity: 0.5 }}>Progress</Typography>
              <Typography variant="caption" sx={{ fontSize: 10, opacity: 0.7 }}>{task.progress}%</Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={task.progress}
              sx={{
                height: 4,
                borderRadius: 2,
                bgcolor: 'rgba(255,255,255,0.05)',
                '& .MuiLinearProgress-bar': {
                  borderRadius: 2,
                  background: 'linear-gradient(90deg, #6C63FF, #FF6584)',
                },
              }}
            />
          </Box>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Box sx={{
              width: 22, height: 22, borderRadius: '50%',
              background: 'linear-gradient(135deg, #6C63FF, #FF6584)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 10, fontWeight: 600,
            }}>
              {task.assignee?.[0] || 'U'}
            </Box>
            <Typography variant="caption" sx={{ opacity: 0.5, fontSize: 11 }}>
              {task.assignee}
            </Typography>
          </Box>
          {task.dueDate && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
              <AccessTime sx={{ fontSize: 12, opacity: 0.5 }} />
              <Typography variant="caption" sx={{ opacity: 0.5, fontSize: 11 }}>
                {task.dueDate}
              </Typography>
            </Box>
          )}
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          onClick={e => e.stopPropagation()}
          PaperProps={{ sx: { background: '#1a1f2e', border: '1px solid rgba(255,255,255,0.1)' } }}
        >
          <MenuItem onClick={() => { moveTask(task.id, 'completed'); handleMenuClose(); }}>
            Mark Complete
          </MenuItem>
          <MenuItem onClick={() => { deleteTask(task.id); handleMenuClose(); }}>
            <Delete sx={{ fontSize: 16, mr: 1 }} /> Delete
          </MenuItem>
        </Menu>
      </CardContent>
    </Card>
  );
}