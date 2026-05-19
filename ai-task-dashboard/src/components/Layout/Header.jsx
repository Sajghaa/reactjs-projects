import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Avatar,
  InputBase,
  Box,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Notifications,
  Search,
  Settings,
  AutoAwesome,
  Menu as MenuIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { styled, alpha } from '@mui/material/styles';

const SearchBar = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 12,
  backgroundColor: alpha(theme.palette.common.white, 0.06),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.1),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  maxWidth: 400,
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(2),
    width: 'auto',
  },
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  transition: 'all 0.3s ease',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1.2, 1, 1.2, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '30ch',
    },
    '&::placeholder': {
      opacity: 0.5,
    },
  },
}));

function Header({ handleDrawerToggle }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: 'rgba(10, 10, 26, 0.8)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
        zIndex: theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{ gap: 1 }}>
        {/* Mobile Menu Button */}
        {isMobile && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 1 }}
          >
            <MenuIcon />
          </IconButton>
        )}

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          style={{ display: isMobile ? 'none' : 'block' }}
        >
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ fontWeight: 700, letterSpacing: '-0.5px' }}
          >
            AI Task Dashboard
          </Typography>
        </motion.div>

        <SearchBar>
          <SearchIconWrapper>
            <Search sx={{ opacity: 0.5 }} />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search tasks with AI…"
            inputProps={{ 'aria-label': 'search' }}
          />
        </SearchBar>

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <IconButton color="inherit" size="small">
              <AutoAwesome sx={{ color: '#FF6584' }} />
            </IconButton>
          </motion.div>

          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <IconButton color="inherit" size="small">
              <Badge badgeContent={4} color="error">
                <Notifications />
              </Badge>
            </IconButton>
          </motion.div>

          {!isMobile && (
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <IconButton color="inherit" size="small">
                <Settings />
              </IconButton>
            </motion.div>
          )}

          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            style={{ marginLeft: 8 }}
          >
            <Avatar
              sx={{
                width: 36,
                height: 36,
                background: 'linear-gradient(135deg, #6C63FF 0%, #FF6584 100%)',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: 600,
                border: '2px solid rgba(255, 255, 255, 0.1)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  border: '2px solid rgba(108, 99, 255, 0.5)',
                  boxShadow: '0 0 20px rgba(108, 99, 255, 0.3)',
                },
              }}
            >
              U
            </Avatar>
          </motion.div>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;