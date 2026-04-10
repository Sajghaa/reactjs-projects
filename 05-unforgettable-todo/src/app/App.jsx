// src/app/App.jsx
import React from 'react';
import { Toaster } from 'react-hot-toast';
import AppRoutes from './AppRoutes';
import { useStore } from './store/store';

function App() {
  const { user } = useStore();

  return (
    <>
      <AppRoutes />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
            borderRadius: '12px',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </>
  );
}

export default App;