import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/', // Adjust the base URL according to your Django server
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export const loginUser = async (mobile_or_email: string, otp: string) => {
  const response = await api.post('/users/', { mobile_or_email, otp });
  return response.data;
};

export const fetchItems = async () => {
  const response = await api.get('/items/');
  return response.data;
};

export const createItem = async (item: any) => {
  const response = await api.post('/items/', item, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },});
  return response.data;
};


export const fetchItemDetails = async (id: string) => {
  const response = await api.get(`/items/${id}/`);
  return response.data;
};

export const placeBid = async (itemId: string, amount: number) => {
  const response = await api.post('/bids/', { item: itemId, amount });
  return response.data;
};

export default api;
