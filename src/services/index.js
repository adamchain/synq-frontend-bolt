// Central export for all services
export { default as apiService } from './api';
export { default as authService } from './authService';
export { default as appointmentService } from './appointmentService';
export { default as clientService } from './clientService';
export { default as patientService } from './patientService';
export { default as inventoryService } from './inventoryService';
export { default as commonService } from './commonService';

// Re-export for backward compatibility if needed
export { default as LoginServices } from './authService';
export { default as CommonServices } from './commonService';