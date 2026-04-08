class AIPrioritizer {
  constructor() {
    this.weights = {
      priority: 0.35,
      urgency: 0.25,
      effort: 0.15,
      userPattern: 0.15,
      context: 0.10
    };
  }

  // Calculate task score using multiple factors
  calculateTaskScore(task, userHistory = null) {
    const scores = {
      priority: this.getPriorityScore(task.priority),
      urgency: this.getUrgencyScore(task.dueDate),
      effort: this.getEffortScore(task.text),
      userPattern: this.getUserPatternScore(task, userHistory),
      context: this.getContextScore()
    };

    // Weighted sum
    const totalScore = 
      scores.priority * this.weights.priority +
      scores.urgency * this.weights.urgency +
      scores.effort * this.weights.effort +
      scores.userPattern * this.weights.userPattern +
      scores.context * this.weights.context;

    return Math.min(100, Math.max(0, totalScore));
  }

  getPriorityScore(priority) {
    const scores = { high: 100, medium: 60, low: 30 };
    return scores[priority] || 50;
  }

  getUrgencyScore(dueDate) {
    if (!dueDate) return 20;
    
    const now = new Date();
    const due = new Date(dueDate);
    const daysLeft = (due - now) / (1000 * 60 * 60 * 24);
    
    if (daysLeft < 0) return 100; // Overdue
    if (daysLeft < 1) return 95;  // Due today
    if (daysLeft < 3) return 80;  // Due in 3 days
    if (daysLeft < 7) return 60;  // Due in a week
    return 30; // No rush
  }

  getEffortScore(taskText) {
    // Estimate effort based on task description length
    const wordCount = taskText.split(' ').length;
    if (wordCount < 5) return 80;  // Small task, easy to complete in sprint
    if (wordCount < 15) return 60;
    return 40; // Complex task might need more time
  }

  getUserPatternScore(task, userHistory) {
    if (!userHistory) return 50;
    
    // Check if user usually completes similar tasks
    const similarTasks = userHistory.filter(t => 
      t.text.toLowerCase().includes(task.text.toLowerCase().split(' ')[0])
    );
    
    if (similarTasks.length > 0) {
      const avgCompletion = similarTasks.reduce((sum, t) => sum + (t.completed ? 1 : 0), 0) / similarTasks.length;
      return avgCompletion * 100;
    }
    
    return 50;
  }

  getContextScore() {
    const hour = new Date().getHours();
    // Boost score during typical work hours
    if (hour >= 9 && hour <= 17) return 70;
    if (hour >= 18 && hour <= 22) return 50;
    return 30;
  }

  // Get top N tasks for focus sprint
  getTopTasks(tasks, limit = 3, userHistory = null) {
    const scoredTasks = tasks.map(task => ({
      ...task,
      aiScore: this.calculateTaskScore(task, userHistory)
    }));
    
    return scoredTasks
      .sort((a, b) => b.aiScore - a.aiScore)
      .slice(0, limit);
  }

  // Generate motivational message based on tasks
  getMotivationalMessage(tasks) {
    const totalScore = tasks.reduce((sum, t) => sum + t.aiScore, 0) / tasks.length;
    
    if (totalScore > 80) {
      return "🔥 These are critical tasks! You've got this!";
    } else if (totalScore > 60) {
      return "⚡ Perfect time to knock these out!";
    } else if (totalScore > 40) {
      return "📌 Good choices for a productive session";
    } else {
      return "💪 Start small, build momentum!";
    }
  }
}

export const aiEngine = new AIPrioritizer();