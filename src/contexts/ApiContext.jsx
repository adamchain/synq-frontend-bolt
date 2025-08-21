import React, { createContext, useContext, useEffect, useState } from 'react';
import { apiService } from '../services';

const ApiContext = createContext();

export const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApi must be used within an ApiProvider');
  }
  return context;
};

export const ApiProvider = ({ children }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [apiStatus, setApiStatus] = useState('unknown'); // 'online', 'offline', 'unknown'

  // Check API connectivity
  const checkApiStatus = async () => {
    try {
      await apiService.get('/healthcheck');
      setApiStatus('online');
      return true;
    } catch (error) {
      setApiStatus('offline');
      return false;
    }
  };

  // Handle online/offline events
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      checkApiStatus();
    };

    const handleOffline = () => {
      setIsOnline(false);
      setApiStatus('offline');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initial check
    checkApiStatus();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Periodic health check
  useEffect(() => {
    const interval = setInterval(() => {
      if (isOnline) {
        checkApiStatus();
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, [isOnline]);

  const value = {
    api: apiService,
    isOnline,
    apiStatus,
    checkApiStatus,
  };

  return (
    <ApiContext.Provider value={value}>
      {children}
    </ApiContext.Provider>
  );
};