import apiService from './api';

class AppointmentService {
  async getAppointments(params = {}) {
    try {
      const response = await apiService.get('/appointments', { params });
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

  async getAppointment(id) {
    try {
      const response = await apiService.get(`/appointments/${id}`);
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

  async createAppointment(appointmentData) {
    try {
      const response = await apiService.post('/appointments', appointmentData);
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

  async updateAppointment(id, appointmentData) {
    try {
      const response = await apiService.patch(`/appointments/${id}`, appointmentData);
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

  async deleteAppointment(id) {
    try {
      await apiService.delete(`/appointments/${id}`);
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        status: error.status,
      };
    }
  }

  async getUpcomingAppointments() {
    try {
      const response = await apiService.get('/appointments/upcoming');
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

const appointmentService = new AppointmentService();
export default appointmentService;