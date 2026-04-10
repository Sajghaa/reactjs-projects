import React from 'react';
import MainLayout from '../layouts/MainLayout';
import TodoList from '../features/todos/components/TodoList';
import FocusTimer from '../features/focus/components/FocusTimer';
import DashboardStats from '../features/dashboard/components/DashboardStats';

function AppRoutes() {
  const [currentView, setCurrentView] = React.useState('todos');

  const renderView = () => {
    switch (currentView) {
      case 'todos':
        return <TodoList />;
      case 'focus':
        return <FocusTimer />;
      case 'dashboard':
        return <DashboardStats />;
      default:
        return <TodoList />;
    }
  };

  return (
    <MainLayout onViewChange={setCurrentView} currentView={currentView}>
      {renderView()}
    </MainLayout>
  );
}

export default AppRoutes;