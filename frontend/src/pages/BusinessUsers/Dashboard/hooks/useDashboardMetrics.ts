import { useEffect, useState } from 'react';
import { get } from 'http';
import { notifications } from '@mantine/notifications';
import { TDashboardMetrics } from '@/Types';
import { fetchDashboardMetrics } from '../utils/dashboardApi';

export const useDashboardMetrics = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [dashboardMetrics, setDashboardMetrics] = useState<TDashboardMetrics>();

  const getDashboardMetrics = async () => {
    try {
      setIsLoading(true);
      const data = await fetchDashboardMetrics();
      setDashboardMetrics(data); // Keep this for now since metrics are in here
    } catch (error: any) {
      notifications.show({
        title: 'Error',
        message: error.response?.data?.message || error.message,
        color: 'red',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getDashboardMetrics();
  }, []);

  return {
    dashboardMetrics,
    setDashboardMetrics,
    getDashboardMetrics,
  };
};
