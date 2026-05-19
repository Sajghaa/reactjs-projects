import React from 'react';
import {
  Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText,
  Box, Typography, Divider, Button, useMediaQuery, useTheme,
} from '@mui/material';
import {
  Dashboard, Assignment, AutoAwesome, TrendingUp,
  Star, Settings, Logout, Add,
} from '@mui/icons-material';

const drawerWidth = 260;

const menuItems = [
  { text: 'Dashboard', icon: <Dashboard />, view: 'dashboard' },
  { text: 'Tasks', icon: <Assignment />, view: 'tasks' },
  { text: 'Analytics', icon: <TrendingUp />, view: 'analytics' },
  { text: 'Starred', icon: <Star />, view: 'starred' },
];

export default function Sidebar({ mobileOpen, setMobileOpen }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', p: 2 }}>
      {/* Logo */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3, px: 1 }}>
        <Box sx={{
          width: 44, height: 44, borderRadius: 3,
          background: 'linear-gradient(135deg, #6C63FF, #FF6584)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <AutoAwesome sx={{ color: 'white', fontSize: 24 }} />
        </Box>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1.2 }}>
            TaskFlow
          </Typography>
          <Typography variant="caption" sx={{ opacity: 0.6 }}>
            AI-Powered
          </Typography>
        </Box>
      </Box>

      {/* New Task Button */}
      <Button
        fullWidth
        variant="contained"
        startIcon={<Add />}
        sx={{
          mb: 3,
          background: 'linear-gradient(135deg, #6C63FF, #FF6584)',
          borderRadius: 2,
          py: 1.2,
          fontWeight: 600,
          textTransform: 'none',
        }}
      >
        New Task
      </Button>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)', mb: 2 }} />

      {/* Menu Items */}
      <List sx={{ flex: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              sx={{
                borderRadius: 2,
                py: 1.2,
                '&:hover': { background: 'rgba(255,255,255,0.05)' },
              }}
              onClick={() => isMobile && setMobileOpen(false)}
            >
              <ListItemIcon sx={{ minWidth: 40, color: 'rgba(255,255,255,0.6)' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} primaryTypographyProps={{ fontSize: 14 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Bottom */}
      <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)', mb: 2 }} />
      <ListItemButton sx={{ borderRadius: 2, mb: 0.5 }}>
        <ListItemIcon sx={{ minWidth: 40, color: 'rgba(255,255,255,0.6)' }}>
          <Settings />
        </ListItemIcon>
        <ListItemText primary="Settings" primaryTypographyProps={{ fontSize: 14 }} />
      </ListItemButton>
      <ListItemButton sx={{ borderRadius: 2 }}>
        <ListItemIcon sx={{ minWidth: 40, color: 'rgba(255,255,255,0.6)' }}>
          <Logout />
        </ListItemIcon>
        <ListItemText primary="Logout" primaryTypographyProps={{ fontSize: 14 }} />
      </ListItemButton>
    </Box>
  );

  return (
    <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              background: '#111624',
              border: 'none',
            },
          }}
        >
          {drawerContent}
        </Drawer>
      ) : (
        <Drawer
          variant="permanent"
          sx={{
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              background: '#111624',
              borderRight: '1px solid rgba(255,255,255,0.06)',
            },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      )}
    </Box>
  );
}