import React, { useState } from 'react';
import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';
import { TaskProvider } from './context/TaskContext';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import Dashboard from './components/Dashboard/Dashboard';
import Particles from './components/UI/Particles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#6C63FF' },
    secondary: { main: '#FF6584' },
    background: { default: '#0A0D14', paper: '#141824' },
  },
  typography: {
    fontFamily: '"Inter", sans-serif',
  },
  shape: { borderRadius: 12 },
});

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <TaskProvider>
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
          <Particles />
          <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
          <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            <Header onMenuClick={() => setMobileOpen(true)} />
            <Dashboard />
          </Box>
        </Box>
      </TaskProvider>
    </ThemeProvider>
  );
}

export default App;