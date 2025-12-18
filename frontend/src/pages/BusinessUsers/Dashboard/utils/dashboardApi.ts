import axios from 'axios';
import { TApplication, TDashboardMetrics } from '@/Types';

export const fetchDashboardMetrics = async (): Promise<TDashboardMetrics> => {
  const response = await axios.get('/api/applications/business/dashboard/metrics');

  return response.data;
};

export const fetchBusinessListings = async (filterParams: {
  searchText?: string | null;
  industry?: string | null;
  sortOption?: string | null;
  page?: number;
  limit?: number;
}) => {
  // Build URL query string from filter parameters
  // Example: { searchText: 'engineer', industry: 'All', page: 1 }
  // becomes: "searchText=engineer&page=1"
  const queryString = new URLSearchParams(
    Object.entries(filterParams)  // Convert object to array: [['searchText', 'engineer'], ['industry', 'All'], ['page', 1]]
      .filter(([_, value]) => value !== undefined && value !== 'All')  // Remove empty filters and 'All' values
      .map(([key, value]) => [key, String(value)])  // Convert all values to strings (URLs need strings)
  ).toString();  // Convert to URL format: "searchText=engineer&page=1"

  const response = await axios.get(`/api/listings/business-listings?${queryString}`);

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
  // Build URL query string from filter parameters
  // Example: { searchText: 'john', status: 'all', page: 1 }
  // becomes: "searchText=john&page=1"
  const queryString = new URLSearchParams(
    Object.entries(filterParams)  // Convert object to array: [['searchText', 'john'], ['status', 'all'], ['page', 1]]
      .filter(([_, value]) => value !== undefined && value !== 'All' && value !== 'all')  // Remove empty filters and 'All'/'all' values
      .map(([key, value]) => [key, String(value)])  // Convert all values to strings (URLs need strings)
  ).toString();  // Convert to URL format: "searchText=john&page=1"

  const response = await axios.get(`/api/applications/business-applications?${queryString}`);

  return response.data;
};

export const updateApplicationStatus = async (
  id: string,
  status: string | null
): Promise<TApplication> => {
  const response = await axios.patch(`/api/applications/status/${id}`, { status });

  return response.data;
};

export const deleteListing = async (listingId: string) => {
  const response = await axios.delete(`/api/listings/${listingId}`);

  return response.data;
};

export const deleteApplication = async (applicationId: string) => {
  const response = await axios.delete(`/api/applications/${applicationId}`);

  return response.data;
};

