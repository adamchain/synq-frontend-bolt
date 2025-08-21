import axios from 'axios';

// API Configuration
const API_CONFIG = {
  baseURL: process.env.NODE_ENV === 'production' 
    ? 'https://api.synq-bolt.com/api/v1'
    : 'http://localhost:3101/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};

// Create axios instance
const apiClient = axios.create(API_CONFIG);

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 errors globally
    if (error.response?.status === 401) {
      // Clear auth tokens
      localStorage.removeItem('authToken');
      sessionStorage.removeItem('authToken');
      
      // Redirect to login if not already there
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

// API Methods
class ApiService {
  // Generic HTTP methods
  async get(url, config = {}) {
    try {
      const response = await apiClient.get(url, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async post(url, data = {}, config = {}) {
    try {
      const response = await apiClient.post(url, data, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async put(url, data = {}, config = {}) {
    try {
      const response = await apiClient.put(url, data, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async patch(url, data = {}, config = {}) {
    try {
      const response = await apiClient.patch(url, data, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async delete(url, config = {}) {
    try {
      const response = await apiClient.delete(url, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Error handler
  handleError(error) {
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      return {
        status,
        message: data?.message || data?.error || 'An error occurred',
        data: data,
      };
    } else if (error.request) {
      // Request was made but no response received
      return {
        status: 0,
        message: 'Network error - please check your connection',
        data: null,
      };
    } else {
      // Something else happened
      return {
        status: 0,
        message: error.message || 'An unexpected error occurred',
        data: null,
      };
    }
  }

  // Set auth token
  setAuthToken(token) {
    if (token) {
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('authToken', token);
    } else {
      delete apiClient.defaults.headers.common['Authorization'];
      localStorage.removeItem('authToken');
      sessionStorage.removeItem('authToken');
    }
  }

  // Get current auth token
  getAuthToken() {
    return localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
  }

  // Clear auth token
  clearAuthToken() {
    this.setAuthToken(null);
  }
}

// Create and export singleton instance
const apiService = new ApiService();
export default apiService;

// Export axios instance for advanced usage if needed
export { apiClient };