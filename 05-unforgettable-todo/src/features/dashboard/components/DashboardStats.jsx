import React from 'react';
import { useStore } from '../../../app/store/store';
import { CheckCircle, Clock, Star, TrendingUp } from 'lucide-react';

function DashboardStats() {
  const { todos, stats } = useStore();
  const completedThisWeek = todos.filter(t => {
    if (!t.completedAt) return false;
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return new Date(t.completedAt) > weekAgo;
  }).length;

  const statsCards = [
    { icon: CheckCircle, label: 'Total Tasks', value: stats.totalTasks, color: 'purple' },
    { icon: Clock, label: 'Completed', value: stats.completedTasks, color: 'green' },
    { icon: Star, label: 'This Week', value: completedThisWeek, color: 'blue' },
    { icon: TrendingUp, label: 'Productivity', value: `${stats.totalTasks === 0 ? 0 : Math.round((stats.completedTasks / stats.totalTasks) * 100)}%`, color: 'pink' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold gradient-text">Dashboard</h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 bg-${card.color}-100 dark:bg-${card.color}-900/30 rounded-lg`}>
                  <Icon className={`w-5 h-5 text-${card.color}-600`} />
                </div>
              </div>
              <h3 className="text-2xl font-bold">{card.value}</h3>
              <p className="text-sm text-gray-500 mt-1">{card.label}</p>
            </div>
          );
        })}
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {todos.slice(0, 5).map(todo => (
            <div key={todo.id} className="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition">
              {todo.completed ? (
                <CheckCircle className="w-4 h-4 text-green-500" />
              ) : (
                <div className="w-4 h-4 border-2 border-gray-300 rounded-full"></div>
              )}
              <span className={todo.completed ? 'line-through text-gray-400' : ''}>
                {todo.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardStats;