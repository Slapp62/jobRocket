import axios from 'axios';
import { TApplication, TDashboardMetrics } from '@/Types';

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const fetchDashboardMetrics = async (): Promise<TDashboardMetrics> => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  const response = await axios.get(`${API_BASE_URL}/api/applications/business/dashboard/metrics`, {
    headers: { 'x-auth-token': token },
  });

  return response.data;
};

export const fetchBusinessListings = async (filterParams: {
  searchWord?: string;
  industry?: string | null;
  sortOption?: string | null;
  page?: number;
  limit?: number;
}) => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  
  // Build URL query string from filter parameters
  // Example: { searchWord: 'engineer', industry: 'All', page: 1 }
  // becomes: "searchWord=engineer&page=1"
  const queryString = new URLSearchParams(
    Object.entries(filterParams)  // Convert object to array: [['searchWord', 'engineer'], ['industry', 'All'], ['page', 1]]
      .filter(([_, value]) => value !== undefined && value !== 'All')  // Remove empty filters and 'All' values
      .map(([key, value]) => [key, String(value)])  // Convert all values to strings (URLs need strings)
  ).toString();  // Convert to URL format: "searchWord=engineer&page=1"
  
  const response = await axios.get(
    `${API_BASE_URL}/api/listings/business-listings?${queryString}`,
    { headers: { 'x-auth-token': token } }
  );
  
  return response.data;
};

export const fetchBusinessApplications = async (filterParams: {
  searchText?: string;
  status?: string | null;
  dateFrom?: string;
  dateTo?: string;
  listingId: string | null;
  sortOption?: string | null;
  page?: number;
  limit?: number;
}) => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');

  // Build URL query string from filter parameters
  // Example: { searchText: 'john', status: 'all', page: 1 }
  // becomes: "searchText=john&page=1"
  const queryString = new URLSearchParams(
    Object.entries(filterParams)  // Convert object to array: [['searchText', 'john'], ['status', 'all'], ['page', 1]]
      .filter(([_, value]) => value !== undefined && value !== 'All' && value !== 'all')  // Remove empty filters and 'All'/'all' values
      .map(([key, value]) => [key, String(value)])  // Convert all values to strings (URLs need strings)
  ).toString();  // Convert to URL format: "searchText=john&page=1"
  
  const response = await axios.get(
    `${API_BASE_URL}/api/applications/business-applications?${queryString}`,
    { headers: { 'x-auth-token': token } }
  );
  
  return response.data;
};

export const updateApplicationStatus = async (
  id: string,
  status: string | null
): Promise<TApplication> => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  const response = await axios.patch(
    `${API_BASE_URL}/api/applications/status/${id}`,
    { status },
    {
      headers: { 'x-auth-token': token },
    }
  );

  return response.data;
};

export const deleteListing = async (listingId: string) => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  const response = await axios.delete(
    `${API_BASE_URL}/api/listings/${listingId}`,
    {
      headers: { 'x-auth-token': token },
    }
  );

  return response.data;
};

export const deleteApplication = async (applicationId: string) => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  const response = await axios.delete(
    `${API_BASE_URL}/api/applications/${applicationId}`,
    {
      headers: { 'x-auth-token': token },
    }
  );

  return response.data;
};

