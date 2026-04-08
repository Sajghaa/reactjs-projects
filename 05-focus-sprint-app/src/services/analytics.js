class AnalyticsService {
  constructor() {
    this.sessions = [];
    this.loadSessions();
  }

  loadSessions() {
    const saved = localStorage.getItem('focusAnalytics');
    if (saved) {
      this.sessions = JSON.parse(saved);
    }
  }

  saveSessions() {
    localStorage.setItem('focusAnalytics', JSON.stringify(this.sessions));
  }

  // Record a completed focus session
  recordSession(sessionData) {
    const session = {
      id: Date.now(),
      date: new Date().toISOString(),
      tasksCompleted: sessionData.tasksCompleted,
      tasksPlanned: sessionData.tasksPlanned,
      timeSpent: sessionData.timeSpent || 25, // minutes
      focusScore: this.calculateFocusScore(sessionData),
      tasks: sessionData.tasks || []
    };
    
    this.sessions.unshift(session); // Add to beginning
    this.saveSessions();
    return session;
  }

  // Calculate focus score (0-100)
  calculateFocusScore(sessionData) {
    let score = 0;
    
    // Completion rate (40% weight)
    const completionRate = sessionData.tasksCompleted / sessionData.tasksPlanned;
    score += completionRate * 40;
    
    // Time efficiency (30% weight)
    const expectedTime = sessionData.tasksPlanned * 5; // Assume 5 min per task
    const timeEfficiency = Math.min(1, expectedTime / sessionData.timeSpent);
    score += timeEfficiency * 30;
    
    // Consistency bonus (30% weight)
    const today = new Date().toDateString();
    const todaysSessions = this.sessions.filter(s => 
      new Date(s.date).toDateString() === today
    ).length;
    
    if (todaysSessions === 1) score += 15;
    if (todaysSessions === 2) score += 25;
    if (todaysSessions >= 3) score += 30;
    
    return Math.round(score);
  }

  // Get user statistics
  getStats() {
    if (this.sessions.length === 0) {
      return {
        totalSessions: 0,
        totalTasksCompleted: 0,
        averageFocusScore: 0,
        bestSession: null,
        streak: 0,
        weeklyProgress: []
      };
    }

    const totalSessions = this.sessions.length;
    const totalTasksCompleted = this.sessions.reduce((sum, s) => sum + s.tasksCompleted, 0);
    const averageFocusScore = this.sessions.reduce((sum, s) => sum + s.focusScore, 0) / totalSessions;
    const bestSession = this.sessions.reduce((best, current) => 
      current.focusScore > best.focusScore ? current : best
    , this.sessions[0]);

    // Calculate current streak
    let streak = 0;
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    
    const hasSessionToday = this.sessions.some(s => 
      new Date(s.date).toDateString() === today
    );
    const hasSessionYesterday = this.sessions.some(s => 
      new Date(s.date).toDateString() === yesterday
    );
    
    if (hasSessionToday) streak = 1;
    if (hasSessionYesterday) streak++;
    
    // Get last 7 days progress
    const weeklyProgress = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(Date.now() - i * 86400000).toDateString();
      const sessionsOnDay = this.sessions.filter(s => 
        new Date(s.date).toDateString() === date
      );
      weeklyProgress.push({
        date: date,
        sessions: sessionsOnDay.length,
        tasksCompleted: sessionsOnDay.reduce((sum, s) => sum + s.tasksCompleted, 0)
      });
    }

    return {
      totalSessions,
      totalTasksCompleted,
      averageFocusScore: Math.round(averageFocusScore),
      bestSession,
      streak,
      weeklyProgress
    };
  }

  // Get motivational message based on stats
  getMotivationalMessage() {
    const stats = this.getStats();
    
    if (stats.totalSessions === 0) {
      return "Ready to start your first focus sprint? 🚀";
    }
    
    if (stats.streak >= 7) {
      return `Amazing ${stats.streak}-day streak! You're on fire! 🔥`;
    }
    
    if (stats.streak >= 3) {
      return `${stats.streak}-day streak! Keep it going! 💪`;
    }
    
    if (stats.averageFocusScore >= 80) {
      return `Focus score of ${stats.averageFocusScore}! Elite performance! 🎯`;
    }
    
    if (stats.totalTasksCompleted > 100) {
      return `You've completed ${stats.totalTasksCompleted} tasks! Legendary! 🏆`;
    }
    
    return `Keep crushing it! ${stats.totalSessions} sprints done! ⚡`;
  }

  // Clear all analytics (for testing)
  clearAll() {
    this.sessions = [];
    this.saveSessions();
  }
}

export const analytics = new AnalyticsService();