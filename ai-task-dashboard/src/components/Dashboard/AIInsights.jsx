import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Chip,
  LinearProgress,
  IconButton,
} from '@mui/material';
import {
  AutoAwesome,
  Lightbulb,
  TrendingUp,
  Warning,
  CheckCircle,
  Refresh,
  Psychology,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useTaskContext } from '../../context/TaskContext';

function AIInsights({ expanded = false }) {
  const { aiSuggestions, generateAISuggestions, stats } = useTaskContext();
  const [loading, setLoading] = useState(false);
  const [insights, setInsights] = useState([]);

  useEffect(() => {
    generateAISuggestions();
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      generateAISuggestions();
      setLoading(false);
    }, 1500);
  };

  const aiInsights = [
    {
      title: 'Productivity Peak',
      description: 'Your productivity peaks between 9 AM - 11 AM',
      icon: <TrendingUp />,
      color: '#00C9A7',
      action: 'Schedule important tasks',
    },
    {
      title: 'Task Pattern',
      description: 'You complete 80% of tasks with clear deadlines',
      icon: <Psychology />,
      color: '#6C63FF',
      action: 'Set more deadlines',
    },
    {
      title: 'Bottleneck Alert',
      description: 'Review column has 5+ tasks waiting',
      icon: <Warning />,
      color: '#FFB84D',
      action: 'Prioritize reviews',
    },
  ];

  return (
    <Card
      sx={{
        background: 'rgba(20, 20, 40, 0.6)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: 4,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <motion.div
              animate={{ rotate: loading ? 360 : 0 }}
              transition={{ duration: 2, repeat: loading ? Infinity : 0 }}
            >
              <AutoAwesome sx={{ color: '#6C63FF' }} />
            </motion.div>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              AI Insights
            </Typography>
          </Box>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <IconButton onClick={handleRefresh} disabled={loading}>
              <Refresh />
            </IconButton>
          </motion.div>
        </Box>

        {loading && <LinearProgress sx={{ mb: 2, borderRadius: 1 }} />}

        <AnimatePresence>
          <List>
            {aiInsights.map((insight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ListItem
                  sx={{
                    mb: 2,
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderRadius: 3,
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 0.05)',
                    },
                  }}
                >
                  <ListItemIcon>
                    <Box
                      sx={{
                        p: 1,
                        borderRadius: 2,
                        background: `${insight.color}20`,
                        color: insight.color,
                      }}
                    >
                      {insight.icon}
                    </Box>
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {insight.title}
                      </Typography>
                    }
                    secondary={
                      <Box>
                        <Typography variant="body2" sx={{ opacity: 0.7, mb: 1 }}>
                          {insight.description}
                        </Typography>
                        <Button
                          size="small"
                          variant="outlined"
                          sx={{
                            borderColor: `${insight.color}50`,
                            color: insight.color,
                            fontSize: '0.7rem',
                            '&:hover': {
                              borderColor: insight.color,
                              background: `${insight.color}10`,
                            },
                          }}
                        >
                          {insight.action}
                        </Button>
                      </Box>
                    }
                  />
                </ListItem>
              </motion.div>
            ))}
          </List>
        </AnimatePresence>

        {aiSuggestions.length > 0 && (
          <>
            <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
              AI Task Suggestions
            </Typography>
            <AnimatePresence>
              {aiSuggestions.map((suggestion, index) => (
                <motion.div
                  key={suggestion.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card
                    sx={{
                      mb: 2,
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(108, 99, 255, 0.2)',
                    }}
                  >
                    <CardContent sx={{ p: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                          {suggestion.title}
                        </Typography>
                        <Chip
                          label={`${suggestion.confidence}% match`}
                          size="small"
                          sx={{
                            background: 'rgba(108, 99, 255, 0.2)',
                            color: '#6C63FF',
                            fontSize: '0.6rem',
                          }}
                        />
                      </Box>
                      <Typography variant="body2" sx={{ opacity: 0.7, mb: 1 }}>
                        {suggestion.description}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Chip
                          icon={<Lightbulb sx={{ fontSize: 14 }} />}
                          label={`Impact: ${suggestion.impact}`}
                          size="small"
                          sx={{ fontSize: '0.6rem' }}
                        />
                        <Chip
                          icon={<CheckCircle sx={{ fontSize: 14 }} />}
                          label={suggestion.priority}
                          size="small"
                          sx={{ fontSize: '0.6rem' }}
                        />
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </>
        )}

        {stats.productivity < 50 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Box
              sx={{
                mt: 2,
                p: 2,
                background: 'linear-gradient(135deg, rgba(255, 101, 132, 0.1), rgba(108, 99, 255, 0.1))',
                borderRadius: 3,
                border: '1px solid rgba(255, 101, 132, 0.3)',
              }}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#FF6584', mb: 1 }}>
                ⚡ Productivity Boost Needed
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.7 }}>
                Your productivity is at {stats.productivity.toFixed(0)}%. Try the Pomodoro technique to improve focus.
              </Typography>
            </Box>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}

export default AIInsights;