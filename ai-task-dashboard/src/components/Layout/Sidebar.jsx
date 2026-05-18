import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Divider,
  Button,
} from '@mui/material';
import {
  Dashboard,
  Assignment,
  Insights,
  AutoAwesome,
  Add,
  Settings,
  Logout,
  TrendingUp,
  Star,
  Schedule,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const menuItems = [
  { text: 'Dashboard', icon: <Dashboard />, value: 'dashboard' },
  { text: 'Tasks', icon: <Assignment />, value: 'tasks' },
  { text: 'AI Insights', icon: <Insights />, value: 'insights' },
  { text: 'Analytics', icon: <TrendingUp />, value: 'analytics' },
  { text: 'Starred', icon: <Star />, value: 'starred' },
  { text: 'Schedule', icon: <Schedule />, value: 'schedule' },
];

function Sidebar({ activeView, setActiveView }) {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 280,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 280,
          boxSizing: 'border-box',
          background: 'rgba(10, 10, 26, 0.9)',
          backdropFilter: 'blur(30px)',
          borderRight: '1px solid rgba(255, 255, 255, 0.05)',
          color: 'white',
        },
      }}
    >
      <Box sx={{ p: 3 }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 4 }}>
            <AutoAwesome sx={{ fontSize: 40, color: '#6C63FF' }} />
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 800, lineHeight: 1.2 }}>
                TaskFlow
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.7 }}>
                AI-Powered
              </Typography>
            </Box>
          </Box>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Button
            variant="contained"
            fullWidth
            startIcon={<Add />}
            sx={{
              mb: 3,
              background: 'linear-gradient(135deg, #6C63FF 0%, #FF6584 100%)',
              borderRadius: 3,
              py: 1.5,
              fontWeight: 600,
              '&:hover': {
                background: 'linear-gradient(135deg, #7B73FF 0%, #FF7594 100%)',
              },
            }}
          >
            New Task
          </Button>
        </motion.div>
      </Box>

      <List sx={{ px: 2 }}>
        {menuItems.map((item, index) => (
          <motion.div
            key={item.value}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ListItem disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                selected={activeView === item.value}
                onClick={() => setActiveView(item.value)}
                sx={{
                  borderRadius: 3,
                  '&.Mui-selected': {
                    background: 'linear-gradient(135deg, rgba(108, 99, 255, 0.2), rgba(255, 101, 132, 0.2))',
                    '&:hover': {
                      background: 'linear-gradient(135deg, rgba(108, 99, 255, 0.3), rgba(255, 101, 132, 0.3))',
                    },
                  },
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.05)',
                  },
                }}
              >
                <ListItemIcon sx={{ color: activeView === item.value ? '#6C63FF' : 'rgba(255, 255, 255, 0.5)' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text}
                  sx={{
                    '& .MuiListItemText-primary': {
                      fontWeight: activeView === item.value ? 600 : 400,
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          </motion.div>
        ))}
      </List>

      <Box sx={{ flexGrow: 1 }} />

      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
      
      <List sx={{ px: 2, pb: 2 }}>
        <ListItem disablePadding>
          <ListItemButton sx={{ borderRadius: 3, '&:hover': { background: 'rgba(255, 255, 255, 0.05)' } }}>
            <ListItemIcon sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
              <Settings />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={{ borderRadius: 3, '&:hover': { background: 'rgba(255, 255, 255, 0.05)' } }}>
            <ListItemIcon sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
              <Logout />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}

export default Sidebar;