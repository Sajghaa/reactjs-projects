import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { day: 'Mon', tasks: 4, completed: 3 },
  { day: 'Tue', tasks: 6, completed: 4 },
  { day: 'Wed', tasks: 8, completed: 7 },
  { day: 'Thu', tasks: 5, completed: 5 },
  { day: 'Fri', tasks: 7, completed: 5 },
  { day: 'Sat', tasks: 3, completed: 2 },
  { day: 'Sun', tasks: 2, completed: 2 },
];

export default function ProductivityChart() {
  return (
    <Card sx={{
      background: 'rgba(20, 25, 40, 0.7)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 3,
      height: '100%',
    }}>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          Weekly Productivity
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorTasks" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6C63FF" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6C63FF" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00C9A7" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#00C9A7" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="day" stroke="rgba(255,255,255,0.4)" />
            <YAxis stroke="rgba(255,255,255,0.4)" />
            <Tooltip
              contentStyle={{
                background: 'rgba(20, 25, 40, 0.95)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 8,
              }}
            />
            <Area type="monotone" dataKey="tasks" stroke="#6C63FF" fill="url(#colorTasks)" />
            <Area type="monotone" dataKey="completed" stroke="#00C9A7" fill="url(#colorCompleted)" />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}