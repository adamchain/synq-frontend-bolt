import apiService from './api';

class CommonService {
  async getStates() {
    try {
      const response = await apiService.get('/states');
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

  async getTimezones() {
    try {
      const response = await apiService.get('/timezones');
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

  async search(query) {
    try {
      const response = await apiService.get('/search', { params: { q: query } });
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

  async healthCheck() {
    try {
      const response = await apiService.get('/healthcheck');
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
}

const commonService = new CommonService();
export default commonService;