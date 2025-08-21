import React, { createContext, useContext, useEffect, useState } from 'react';
import { authService } from '../services';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is authenticated on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (authService.isAuthenticated()) {
          const result = await authService.getCurrentUser();
          if (result.success) {
            setUser(result.data);
            setIsAuthenticated(true);
          } else {
            // Token might be invalid, clear it
            authService.logout();
            setUser(null);
            setIsAuthenticated(false);
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        authService.logout();
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials) => {
    try {
      setLoading(true);
      const result = await authService.authenticate(credentials);
      
      if (result.success) {
        setUser(result.data.user);
        setIsAuthenticated(true);
        return { success: true };
      } else {
        return { 
          success: false, 
          error: result.error || 'Login failed' 
        };
      }
    } catch (error) {
      return { 
        success: false, 
        error: error.message || 'Login failed' 
      };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      const result = await authService.register(userData);
      
      if (result.success) {
        return { success: true, data: result.data };
      } else {
        return { 
          success: false, 
          error: result.error || 'Registration failed' 
        };
      }
    } catch (error) {
      return { 
        success: false, 
        error: error.message || 'Registration failed' 
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const updateProfile = async (userData) => {
    try {
      const result = await authService.updateProfile(userData);
      
      if (result.success) {
        setUser(result.data);
        return { success: true, data: result.data };
      } else {
        return { 
          success: false, 
          error: result.error || 'Profile update failed' 
        };
      }
    } catch (error) {
      return { 
        success: false, 
        error: error.message || 'Profile update failed' 
      };
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};