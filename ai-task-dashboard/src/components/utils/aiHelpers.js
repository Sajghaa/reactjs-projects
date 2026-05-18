import { v4 as uuidv4 } from 'uuid';

export const generateAITasks = (existingTasks) => {
  const aiTaskTemplates = [
    {
      title: 'Review project documentation',
      description: 'AI suggests reviewing documentation based on recent changes',
      priority: 'medium',
      category: 'documentation',
    },
    {
      title: 'Optimize database queries',
      description: 'Performance analysis suggests optimization needed',
      priority: 'high',
      category: 'performance',
    },
    {
      title: 'Update dependencies',
      description: 'Several packages have new stable versions',
      priority: 'low',
      category: 'maintenance',
    },
    {
      title: 'Write unit tests for new features',
      description: 'Code coverage dropped below threshold',
      priority: 'high',
      category: 'testing',
    },
    {
      title: 'Refactor authentication module',
      description: 'Code complexity analysis suggests refactoring',
      priority: 'medium',
      category: 'refactoring',
    },
  ];

  // Filter out suggestions that are too similar to existing tasks
  return aiTaskTemplates
    .filter(template => 
      !existingTasks.some(task => 
        task.title.toLowerCase().includes(template.title.toLowerCase())
      )
    )
    .slice(0, 3)
    .map(template => ({
      ...template,
      id: uuidv4(),
      confidence: Math.floor(Math.random() * 30 + 70), // 70-100% confidence
      impact: ['high', 'medium', 'low'][Math.floor(Math.random() * 3)],
    }));
};

export const predictTaskCompletion = (task) => {
  // Simple AI prediction logic
  const factors = {
    priority: { high: 1.2, medium: 1, low: 0.8 },
    complexity: { high: 1.5, medium: 1, low: 0.7 },
  };

  const baseTime = 3; // base 3 days
  const priorityFactor = factors.priority[task.priority] || 1;
  
  return Math.round(baseTime * priorityFactor);
};

export const analyzeProductivity = (tasks) => {
  const completed = tasks.filter(t => t.status === 'completed').length;
  const total = tasks.length;
  const ratio = total > 0 ? completed / total : 0;

  return {
    score: Math.round(ratio * 100),
    trend: ratio > 0.7 ? 'increasing' : ratio > 0.4 ? 'stable' : 'decreasing',
    recommendation: ratio < 0.5 
      ? 'Try breaking down large tasks into smaller ones'
      : ratio < 0.8
      ? 'Consider time-boxing your tasks'
      : 'Great productivity! Keep up the momentum',
  };
};