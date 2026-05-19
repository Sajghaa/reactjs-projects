import React from 'react';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { Assignment, CheckCircle, TrendingUp, Schedule } from '@mui/icons-material';

const statItems = [
  { label: 'Total Tasks', key: 'total', icon: <Assignment />, color: '#6C63FF' },
  { label: 'Completed', key: 'completed', icon: <CheckCircle />, color: '#00C9A7' },
  { label: 'In Progress', key: 'inProgress', icon: <TrendingUp />, color: '#FFB84D' },
  { label: 'To Do', key: 'todo', icon: <Schedule />, color: '#FF6584' },
];

export default function StatsCards({ stats }) {
  return (
    <Grid container spacing={2}>
      {statItems.map((item, index) => (
        <Grid item xs={6} md={3} key={item.key}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card sx={{
              background: 'rgba(20, 25, 40, 0.7)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 3,
            }}>
              <CardContent sx={{ p: 2.5 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box>
                    <Typography variant="body2" sx={{ opacity: 0.6, mb: 0.5 }}>
                      {item.label}
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                      {stats[item.key] || 0}
                    </Typography>
                  </Box>
                  <Box sx={{
                    p: 1.2, borderRadius: 2,
                    background: `${item.color}20`,
                    color: item.color,
                  }}>
                    {item.icon}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  );
}