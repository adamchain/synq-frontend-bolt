import apiService from './api';

class PatientService {
  async getPatients(params = {}) {
    try {
      const response = await apiService.get('/patients', { params });
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

  async getPatient(id) {
    try {
      const response = await apiService.get(`/patients/${id}`);
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

  async createPatient(patientData) {
    try {
      const response = await apiService.post('/patients', patientData);
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

  async updatePatient(id, patientData) {
    try {
      const response = await apiService.patch(`/patients/${id}`, patientData);
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

  async deletePatient(id) {
    try {
      await apiService.delete(`/patients/${id}`);
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
}

const patientService = new PatientService();
export default patientService;