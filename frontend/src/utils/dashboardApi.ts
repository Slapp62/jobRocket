import { TApplication, TBusinessDashboard } from "@/Types";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const fetchDashboardData = async (): Promise<TBusinessDashboard> => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  const response = await axios.get(`${API_BASE_URL}/api/applications/business/dashboard`, {
    headers: { 'x-auth-token': token },
  });

  return response.data;
}

export const updateApplicationStatus = async (id: string, status: string | null): Promise<TApplication> => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  const response = await axios.patch(`${API_BASE_URL}/api/applications/status/${id}`, { status }, {
    headers: { 'x-auth-token': token },
  });

  return response.data;
}