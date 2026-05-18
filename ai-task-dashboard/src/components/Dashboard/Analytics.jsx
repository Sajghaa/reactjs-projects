import React from 'react';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { useTaskContext } from '../../context/TaskContext';
import { TrendingUp, Assignment, CheckCircle, Schedule } from '@mui/icons-material';

const weeklyData = [
  { name: 'Mon', completed: 4, created: 7 },
  { name: 'Tue', completed: 3, created: 5 },
  { name: 'Wed', completed: 6, created: 8 },
  { name: 'Thu', completed: 8, created: 10 },
  { name: 'Fri', completed: 5, created: 6 },
  { name: 'Sat', completed: 2, created: 3 },
  { name: 'Sun', completed: 1, created: 2 },
];

const productivityData = [
  { name: 'Week 1', productivity: 65 },
  { name: 'Week 2', productivity: 72 },
  { name: 'Week 3', productivity: 68 },
  { name: 'Week 4', productivity: 85 },
  { name: 'Week 5', productivity: 78 },
  { name: 'Week 6', productivity: 92 },
];

const COLORS = ['#6C63FF', '#FF6584', '#00C9A7', '#FFB84D'];

function Analytics() {
  const { stats } = useTaskContext();

  const statCards = [
    {
      title: 'Total Tasks',
      value: stats.total,
      icon: <Assignment sx={{ fontSize: 40 }} />,
      color: '#6C63FF',
      bg: 'rgba(108, 99, 255, 0.1)',
    },
    {
      title: 'Completed',
      value: stats.completed,
      icon: <CheckCircle sx={{ fontSize: 40 }} />,
      color: '#00C9A7',
      bg: 'rgba(0, 201, 167, 0.1)',
    },
    {
      title: 'In Progress',
      value: stats.inProgress,
      icon: <TrendingUp sx={{ fontSize: 40 }} />,
      color: '#FFB84D',
      bg: 'rgba(255, 184, 77, 0.1)',
    },
    {
      title: 'Productivity',
      value: `${stats.productivity.toFixed(0)}%`,
      icon: <Schedule sx={{ fontSize: 40 }} />,
      color: '#FF6584',
      bg: 'rgba(255, 101, 132, 0.1)',
    },
  ];

  const pieData = [
    { name: 'Completed', value: stats.completed },
    { name: 'In Progress', value: stats.inProgress },
    { name: 'Todo', value: stats.todo },
  ];

  return (
    <Grid container spacing={3}>
      {statCards.map((stat, index) => (
        <Grid item xs={12} sm={6} md={3} key={stat.title}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
          >
            <Card
              sx={{
                background: 'rgba(20, 20, 40, 0.6)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box>
                    <Typography variant="body2" sx={{ opacity: 0.7, mb: 1 }}>
                      {stat.title}
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                      {stat.value}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      p: 1.5,
                      borderRadius: 3,
                      background: stat.bg,
                      color: stat.color,
                    }}
                  >
                    {stat.icon}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      ))}

      <Grid item xs={12} md={8}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card sx={{ p: 2, background: 'rgba(20, 20, 40, 0.6)', backdropFilter: 'blur(10px)' }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Weekly Task Activity
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={weeklyData}>
                <defs>
                  <linearGradient id="colorCreated" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6C63FF" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6C63FF" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00C9A7" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#00C9A7" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip
                  contentStyle={{
                    background: 'rgba(20, 20, 40, 0.9)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 8,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="created"
                  stroke="#6C63FF"
                  fillOpacity={1}
                  fill="url(#colorCreated)"
                />
                <Area
                  type="monotone"
                  dataKey="completed"
                  stroke="#00C9A7"
                  fillOpacity={1}
                  fill="url(#colorCompleted)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>
      </Grid>

      <Grid item xs={12} md={4}>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card sx={{ p: 2, background: 'rgba(20, 20, 40, 0.6)', backdropFilter: 'blur(10px)', height: '100%' }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Task Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: 'rgba(20, 20, 40, 0.9)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 8,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
              {pieData.map((item, index) => (
                <Box key={item.name} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: COLORS[index] }} />
                  <Typography variant="caption">{item.name}</Typography>
                </Box>
              ))}
            </Box>
          </Card>
        </motion.div>
      </Grid>

      <Grid item xs={12}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card sx={{ p: 2, background: 'rgba(20, 20, 40, 0.6)', backdropFilter: 'blur(10px)' }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Productivity Trend
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={productivityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip
                  contentStyle={{
                    background: 'rgba(20, 20, 40, 0.9)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 8,
                  }}
                />
                <Bar dataKey="productivity" fill="#FF6584" radius={[8, 8, 0, 0]}>
                  {productivityData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={`url(#colorBar${index})`}
                    />
                  ))}
                </Bar>
                <defs>
                  {productivityData.map((_, index) => (
                    <linearGradient key={index} id={`colorBar${index}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#FF6584" />
                      <stop offset="100%" stopColor="#6C63FF" />
                    </linearGradient>
                  ))}
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>
      </Grid>
    </Grid>
  );
}

export default Analytics;