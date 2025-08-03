// frontend/src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth APIs
export const registerUser = (userData) => api.post('/auth/register', userData);
export const loginUser = (credentials) => api.post('/auth/login', credentials);

// Customer APIs
export const getCustomerParcels = () => api.get('/bookings/my-bookings');
export const bookParcel = (parcelData) => api.post('/bookings', parcelData);

// Admin APIs
export const getAllAssignedParcels = (statusFilter) =>
  api.get('/admin/dashboard', { params: { status: statusFilter } });
export const getUnassignedParcelsAndAgents = () => api.get('/admin/assign-parcel-data');
export const assignParcelToAgent = (parcelId, agentId) =>
  api.post('/admin/assign-parcel', { parcelId, agentId });
export const getAllUsers = () => api.get('/admin/users');

// Agent APIs
export const getAssignedParcels = () => api.get('/agent/assigned-parcels');
export const updateParcelStatus = (parcelId, statusData) =>
  api.put('/agent/update-status', statusData);

export default api;