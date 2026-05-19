import React from 'react';
import {
  AppBar, Toolbar, Typography, IconButton, Badge,
  Avatar, Box, useMediaQuery, useTheme,
} from '@mui/material';
import { Notifications, Search, Menu as MenuIcon, AutoAwesome } from '@mui/icons-material';

export default function Header({ onMenuClick }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: 'rgba(17, 22, 36, 0.8)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <Toolbar>
        {isMobile && (
          <IconButton edge="start" onClick={onMenuClick} sx={{ mr: 1 }}>
            <MenuIcon />
          </IconButton>
        )}
        
        <Typography variant="h6" sx={{ fontWeight: 700, flexGrow: 1 }}>
          Dashboard
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton><AutoAwesome sx={{ color: '#FF6584' }} /></IconButton>
          <IconButton>
            <Badge badgeContent={3} color="error"><Notifications /></Badge>
          </IconButton>
          <Avatar sx={{
            width: 34, height: 34,
            background: 'linear-gradient(135deg, #6C63FF, #FF6584)',
            fontSize: 14, fontWeight: 600,
          }}>
            U
          </Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
}