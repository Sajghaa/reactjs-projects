import React, { useState } from 'react';
import { Box, Container, Grid } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { TaskProvider } from './context/TaskContext';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import Analytics from './components/Dashboard/Analytics';
import TaskBoard from './components/Dashboard/TaskBoard';
import AIInsights from './components/Dashboard/AIInsights';
import ParticleField from './components/UI/ParticleField';

const drawerWidth = 280;

function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <TaskProvider>
      <Box sx={{ display: 'flex', minHeight: '100vh', position: 'relative' }}>
        <ParticleField />
        
        {/* Sidebar */}
        <Box
          component="nav"
          sx={{
            width: { md: drawerWidth },
            flexShrink: { md: 0 },
          }}
        >
          <Sidebar
            activeView={activeView}
            setActiveView={setActiveView}
            mobileOpen={mobileOpen}
            handleDrawerToggle={handleDrawerToggle}
            drawerWidth={drawerWidth}
          />
        </Box>

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: { md: `calc(100% - ${drawerWidth}px)` },
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Header handleDrawerToggle={handleDrawerToggle} />
          
          <Box
            sx={{
              flex: 1,
              p: { xs: 2, sm: 3, md: 4 },
              overflow: 'auto',
            }}
          >
            <Container
              maxWidth={false}
              sx={{
                maxWidth: '1600px',
                mx: 'auto',
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeView}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  style={{ width: '100%' }}
                >
                  <Grid container spacing={3}>
                    {activeView === 'dashboard' && (
                      <>
                        <Grid item xs={12} lg={8}>
                          <Analytics />
                        </Grid>
                        <Grid item xs={12} lg={4}>
                          <AIInsights />
                        </Grid>
                        <Grid item xs={12}>
                          <TaskBoard />
                        </Grid>
                      </>
                    )}
                    {activeView === 'tasks' && (
                      <Grid item xs={12}>
                        <TaskBoard expanded />
                      </Grid>
                    )}
                    {activeView === 'insights' && (
                      <Grid item xs={12}>
                        <AIInsights expanded />
                      </Grid>
                    )}
                  </Grid>
                </motion.div>
              </AnimatePresence>
            </Container>
          </Box>
        </Box>
      </Box>
    </TaskProvider>
  );
}

export default App;