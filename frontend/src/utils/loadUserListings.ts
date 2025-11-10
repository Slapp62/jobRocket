import axios from 'axios';
import { notifications } from '@mantine/notifications';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8181';

export const loadUserListings = async () => {
  try {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const response = await axios.get(`${API_BASE_URL}/api/listings/my-listings`, {
      headers: { 'x-auth-token': token },
    });
    return response.data;
  } catch (error: any) {
    notifications.show({
      title: 'Error',
      message: error?.message || 'Failed to load listings',
      color: 'red',
    });
  }
};
