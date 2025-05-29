import { getToken } from './auth';

// Configuration de l'API
export const API_URL = 'http://192.168.0.241:3000'; // Ton IP

export const getApiUrl = (endpoint: string) => {
  return `${API_URL}/api${endpoint}`;
};

// Headers avec authentification
export const getAuthHeaders = async () => {
  const token = await getToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
};