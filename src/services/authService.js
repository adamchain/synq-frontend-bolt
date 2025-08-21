import apiService from './api';

class AuthService {
  async authenticate(credentials) {
    try {
      const response = await apiService.post('/authenticate', credentials);
      
      if (response.authToken) {
        apiService.setAuthToken(response.authToken);
      }
      
      return {
        success: true,
        data: response,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        status: error.status,
      };
    }
  }

  async register(userData) {
    try {
      const response = await apiService.post('/register', userData);
      return {
        success: true,
        data: response,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        status: error.status,
      };
    }
  }

  async getCurrentUser() {
    try {
      const response = await apiService.get('/me');
      return {
        success: true,
        data: response,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        status: error.status,
      };
    }
  }

  async updateProfile(userData) {
    try {
      const response = await apiService.patch('/me', userData);
      return {
        success: true,
        data: response,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        status: error.status,
      };
    }
  }

  async logout() {
    try {
      // Clear local auth state
      apiService.clearAuthToken();
      
      // Optional: Call server logout endpoint if it exists
      // await apiService.post('/logout');
      
      return {
        success: true,
      };
    } catch (error) {
      // Even if server logout fails, clear local state
      apiService.clearAuthToken();
      return {
        success: true,
      };
    }
  }

  isAuthenticated() {
    return !!apiService.getAuthToken();
  }

  getToken() {
    return apiService.getAuthToken();
  }
}

const authService = new AuthService();
export default authService;