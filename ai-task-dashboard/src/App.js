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

function App() {
  const [activeView, setActiveView] = useState('dashboard');

  return (
    <TaskProvider>
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <ParticleField />
        <Sidebar activeView={activeView} setActiveView={setActiveView} />
        <Box component="main" sx={{ flexGrow: 1, ml: '280px' }}>
          <Header />
          <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeView}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
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
    </TaskProvider>
  );
}

export default App;