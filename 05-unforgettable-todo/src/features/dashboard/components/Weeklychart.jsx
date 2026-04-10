import React from 'react';
import { useStore } from '../../../app/store/store';

function WeeklyChart() {
  const { todos } = useStore();
  
  const getWeeklyData = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const data = days.map(() => 0);
    
    todos.forEach(todo => {
      if (todo.completedAt) {
        const day = new Date(todo.completedAt).getDay();
        data[day]++;
      }
    });
    
    return data;
  };

  const data = getWeeklyData();
  const maxValue = Math.max(...data, 1);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
      <h3 className="font-semibold mb-4">Weekly Activity</h3>
      <div className="flex items-end justify-between h-48 gap-2">
        {data.map((value, index) => (
          <div key={index} className="flex-1 flex flex-col items-center gap-2">
            <div 
              className="w-full gradient-bg rounded-t-lg transition-all duration-500"
              style={{ height: `${(value / maxValue) * 100}%`, minHeight: '4px' }}
            />
            <span className="text-xs text-gray-500">{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][index]}</span>
            <span className="text-xs font-semibold">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeeklyChart;