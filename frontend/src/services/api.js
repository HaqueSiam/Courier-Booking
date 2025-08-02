// === File: frontend/services/api.js ===

import axios from 'axios';

// Create an axios instance with baseURL and default headers
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Adjust the backend URL and port accordingly
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to attach token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Or use context if preferred
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// API calls grouped by feature

// Auth APIs
export const registerUser = (userData) => api.post('/auth/register', userData);
export const loginUser = (credentials) => api.post('/auth/login', credentials);

// Customer APIs
export const getCustomerParcels = () => api.get('/parcels/my');
export const bookParcel = (parcelData) => api.post('/parcels/book', parcelData);

// Admin APIs
export const getAllAssignedParcels = (statusFilter) =>
  api.get('/admin/parcels', { params: { status: statusFilter } });
export const getUnassignedParcels = () => api.get('/admin/parcels/unassigned');
export const assignParcelToAgent = (parcelId, agentId) =>
  api.post(`/admin/parcels/${parcelId}/assign`, { agentId });
export const getAllUsers = () => api.get('/admin/users');

// Agent APIs
export const getAssignedParcelsForAgent = () => api.get('/agent/parcels');
export const updateParcelStatus = (parcelId, statusData) =>
  api.put(`/agent/parcels/${parcelId}/status`, statusData);

export default api;
