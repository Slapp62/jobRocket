import { useEffect, useState } from 'react';
import axios from 'axios';
import { notifications } from '@mantine/notifications';
import { TApplication } from '@/Types';
import { fetchBusinessApplications } from '../utils/dashboardApi';

export const useDashboardApplications = () => {
  // State
  const [applications, setApplications] = useState<TApplication[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Filters
  const [searchText, setSearchText] = useState('');
  const [status, setStatus] = useState<string | null>('all');
  const [dateFrom, setDateFrom] = useState<string | null>('');
  const [dateTo, setDateTo] = useState<string | null>('');
  const [sortOption, setSortOption] = useState<string | null>('date-newest');

  // Backend still uses listingId filter, but we always fetch all listings
  // since grouping happens on the frontend now
  const listingId = 'all';

  const removeApplicationById = (applicationId: string) => {
    return applications.filter((app) => app._id !== applicationId);
  };

  useEffect(() => {
    const getBusinessApplications = async () => {
      setIsLoading(true);
      try {
        const data = await fetchBusinessApplications({
          searchText: searchText || undefined,
          status,
          listingId,
          dateFrom: dateFrom || undefined,
          dateTo: dateTo || undefined,
          sortOption,
          page: 1,
          limit: 100, // Fetch more since we're grouping on frontend
        });
        setApplications(data.applications);
      } catch (error: any) {
        notifications.show({
          title: 'Error',
          message: error.response?.data?.message || 'Failed to load applications',
          color: 'red',
        });
      } finally {
        setIsLoading(false);
      }
    };
    getBusinessApplications();
  }, [searchText, status, listingId, dateFrom, dateTo, sortOption]);

  return {
    applications,
    isLoading,
    searchText,
    status,
    dateFrom,
    dateTo,
    sortOption,
    setSearchText,
    setStatus,
    setDateFrom,
    setDateTo,
    setSortOption,
    setApplications,
    removeApplicationById,
  };
};
