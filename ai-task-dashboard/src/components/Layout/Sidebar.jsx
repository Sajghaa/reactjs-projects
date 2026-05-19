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
  Toolbar,
  useMediaQuery,
  useTheme,
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

function Sidebar({ activeView, setActiveView, mobileOpen, handleDrawerToggle, drawerWidth }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const drawer = (
    <Box sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      background: 'rgba(10, 10, 26, 0.95)',
      backdropFilter: 'blur(30px)',
    }}>
      {/* Logo Section */}
      <Box sx={{ p: 3, pb: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: 3,
                background: 'linear-gradient(135deg, #6C63FF, #FF6584)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 32px rgba(108, 99, 255, 0.3)',
              }}
            >
              <AutoAwesome sx={{ fontSize: 28, color: 'white' }} />
            </Box>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 800, lineHeight: 1.2, letterSpacing: '-0.5px' }}>
                TaskFlow
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.6, fontWeight: 500 }}>
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
              mb: 1,
              background: 'linear-gradient(135deg, #6C63FF 0%, #FF6584 100%)',
              borderRadius: 3,
              py: 1.5,
              fontWeight: 600,
              textTransform: 'none',
              fontSize: '0.95rem',
              boxShadow: '0 4px 15px rgba(108, 99, 255, 0.3)',
              transition: 'all 0.3s ease',
              '&:hover': {
                background: 'linear-gradient(135deg, #7B73FF 0%, #FF7594 100%)',
                boxShadow: '0 6px 20px rgba(108, 99, 255, 0.4)',
                transform: 'translateY(-1px)',
              },
            }}
          >
            New Task
          </Button>
        </motion.div>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.06)', mx: 2 }} />

      {/* Navigation Items */}
      <List sx={{ px: 2, pt: 2, flex: 1 }}>
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
                onClick={() => {
                  setActiveView(item.value);
                  if (isMobile) handleDrawerToggle();
                }}
                sx={{
                  borderRadius: 3,
                  py: 1.2,
                  px: 2,
                  transition: 'all 0.2s ease',
                  '&.Mui-selected': {
                    background: 'linear-gradient(135deg, rgba(108, 99, 255, 0.2), rgba(255, 101, 132, 0.2))',
                    '&:hover': {
                      background: 'linear-gradient(135deg, rgba(108, 99, 255, 0.3), rgba(255, 101, 132, 0.3))',
                    },
                    '& .MuiListItemIcon-root': {
                      color: '#6C63FF',
                    },
                  },
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.05)',
                    transform: 'translateX(4px)',
                  },
                }}
              >
                <ListItemIcon 
                  sx={{ 
                    minWidth: 40,
                    color: activeView === item.value ? '#6C63FF' : 'rgba(255, 255, 255, 0.5)',
                    transition: 'color 0.2s ease',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text}
                  sx={{
                    '& .MuiListItemText-primary': {
                      fontWeight: activeView === item.value ? 600 : 400,
                      fontSize: '0.9rem',
                      transition: 'font-weight 0.2s ease',
                    },
                  }}
                />
                {activeView === item.value && (
                  <Box
                    sx={{
                      width: 4,
                      height: 20,
                      borderRadius: 2,
                      background: 'linear-gradient(180deg, #6C63FF, #FF6584)',
                    }}
                  />
                )}
              </ListItemButton>
            </ListItem>
          </motion.div>
        ))}
      </List>

      {/* Bottom Actions */}
      <Box sx={{ px: 2, pb: 2 }}>
        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.06)', mb: 2 }} />
        
        <ListItem disablePadding>
          <ListItemButton 
            sx={{ 
              borderRadius: 3, 
              py: 1.2,
              '&:hover': { 
                background: 'rgba(255, 255, 255, 0.05)',
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40, color: 'rgba(255, 255, 255, 0.5)' }}>
              <Settings />
            </ListItemIcon>
            <ListItemText 
              primary="Settings"
              sx={{
                '& .MuiListItemText-primary': {
                  fontSize: '0.9rem',
                },
              }}
            />
          </ListItemButton>
        </ListItem>
        
        <ListItem disablePadding>
          <ListItemButton 
            sx={{ 
              borderRadius: 3, 
              py: 1.2,
              '&:hover': { 
                background: 'rgba(255, 72, 66, 0.1)',
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40, color: 'rgba(255, 255, 255, 0.5)' }}>
              <Logout />
            </ListItemIcon>
            <ListItemText 
              primary="Logout"
              sx={{
                '& .MuiListItemText-primary': {
                  fontSize: '0.9rem',
                },
              }}
            />
          </ListItemButton>
        </ListItem>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Mobile drawer */}
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              border: 'none',
            },
          }}
        >
          {drawer}
        </Drawer>
      ) : (
        /* Desktop drawer */
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              borderRight: '1px solid rgba(255, 255, 255, 0.06)',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      )}
    </>
  );
}

export default Sidebar;