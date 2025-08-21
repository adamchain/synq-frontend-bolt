import apiService from './api';

class InventoryService {
  async getInventory(params = {}) {
    try {
      const response = await apiService.get('/inventory', { params });
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

  async getInventoryItem(id) {
    try {
      const response = await apiService.get(`/inventory/${id}`);
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

  async createInventoryItem(itemData) {
    try {
      const response = await apiService.post('/inventory', itemData);
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

  async updateInventoryItem(id, itemData) {
    try {
      const response = await apiService.patch(`/inventory/${id}`, itemData);
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

  async deleteInventoryItem(id) {
    try {
      await apiService.delete(`/inventory/${id}`);
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

  // Inventory packages
  async getInventoryPackages(inventoryId, params = {}) {
    try {
      const response = await apiService.get(`/inventory/${inventoryId}/packages`, { params });
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

  async addInventoryPackage(inventoryId, packageData) {
    try {
      const response = await apiService.post(`/inventory/${inventoryId}/packages`, packageData);
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

const inventoryService = new InventoryService();
export default inventoryService;