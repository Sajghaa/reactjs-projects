import React from 'react';
import { Box, Grid, Typography, Card, CardContent } from '@mui/material';
import { motion } from 'framer-motion';
import { useTasks } from '../../context/TaskContext';
import TaskBoard from './TaskBoard';
import StatsCards from './StatsCards';
import ProductivityChart from './ProductivityChart';

export default function Dashboard() {
  const { stats } = useTasks();

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, position: 'relative', zIndex: 1 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
          Overview
        </Typography>

        <StatsCards stats={stats} />

        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid item xs={12} lg={8}>
            <ProductivityChart />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Card sx={{
              background: 'rgba(20, 25, 40, 0.7)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 3,
              height: '100%',
            }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  🤖 AI Insights
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.7, mb: 2 }}>
                  You complete 80% of tasks on time. Try prioritizing high-impact tasks first.
                </Typography>
                <Box sx={{ p: 2, background: 'rgba(108, 99, 255, 0.1)', borderRadius: 2, mb: 1 }}>
                  <Typography variant="body2">💡 Schedule deep work sessions for complex tasks</Typography>
                </Box>
                <Box sx={{ p: 2, background: 'rgba(255, 101, 132, 0.1)', borderRadius: 2 }}>
                  <Typography variant="body2">⚠️ 3 tasks are overdue - review priorities</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ mt: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
            Task Board
          </Typography>
          <TaskBoard />
        </Box>
      </motion.div>
    </Box>
  );
}