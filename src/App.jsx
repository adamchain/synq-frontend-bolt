import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ApiProvider } from './contexts/ApiContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import AppointmentsScreen from './screens/AppointmentsScreen';
import ClientsScreen from './screens/ClientsScreen';
import PatientsScreen from './screens/PatientsScreen';
import InventoryScreen from './screens/InventoryScreen';
import ReportsScreen from './screens/ReportsScreen';
import SettingsScreen from './screens/SettingsScreen';

function App() {
  return (
    <ApiProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/" element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<DashboardScreen />} />
              <Route path="appointments" element={<AppointmentsScreen />} />
              <Route path="clients" element={<ClientsScreen />} />
              <Route path="patients" element={<PatientsScreen />} />
              <Route path="inventory" element={<InventoryScreen />} />
              <Route path="reports" element={<ReportsScreen />} />
              <Route path="settings" element={<SettingsScreen />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ApiProvider>
  );
}

export default App;