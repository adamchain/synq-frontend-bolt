import apiService from './api';

class ClientService {
  async getClients(params = {}) {
    try {
      const response = await apiService.get('/clients', { params });
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

  async getClient(id) {
    try {
      const response = await apiService.get(`/clients/${id}`);
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

  async createClient(clientData) {
    try {
      const response = await apiService.post('/clients', clientData);
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

  async updateClient(id, clientData) {
    try {
      const response = await apiService.patch(`/clients/${id}`, clientData);
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

  async deleteClient(id) {
    try {
      await apiService.delete(`/clients/${id}`);
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

  // Client phone management
  async getClientPhones(clientId, params = {}) {
    try {
      const response = await apiService.get(`/clients/${clientId}/phones`, { params });
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

  async addClientPhone(clientId, phoneData) {
    try {
      const response = await apiService.post(`/clients/${clientId}/phones`, phoneData);
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

  // Client referrals
  async getClientReferrals(clientId, params = {}) {
    try {
      const response = await apiService.get(`/clients/${clientId}/referrals`, { params });
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

  async addClientReferral(clientId, referralData) {
    try {
      const response = await apiService.post(`/clients/${clientId}/referrals`, referralData);
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

const clientService = new ClientService();
export default clientService;