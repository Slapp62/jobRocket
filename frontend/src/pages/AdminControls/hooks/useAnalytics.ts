import { useState, useEffect } from 'react';
import axios from 'axios';
import { notifications } from '@mantine/notifications';

/**
 * Analytics Data Types
 */
interface PlatformMetrics {
  jobs: {
    total: number;
  };
  applications: {
    total: number;
    last30Days: number;
    last7Days: number;
  };
  users: {
    total: number;
    jobseekers: number;
    businesses: number;
  };
  engagement: {
    jobViews30d: number;
    jobViews7d: number;
    searches30d: number;
    searches7d: number;
    conversionRate30d: number;
  };
}

interface SearchInsight {
  query: string;
  searchCount: number;
  avgResults: number;
}

interface PopularJob {
  _id: string;
  jobTitle: string;
  companyName: string;
  city: string;
  viewsLast30Days: number;
  totalViews: number;
  createdAt: string;
}

interface ApplicationMetrics {
  totalViews: number;
  totalApplications: number;
  viewToApplicationRate: number;
  applicationsByStatus: {
    pending: number;
    reviewed: number;
    rejected: number;
  };
}

/**
 * Custom hook for fetching analytics data from admin API
 *
 * This hook fetches all analytics data needed for the admin dashboard:
 * - Platform-wide metrics (jobs, applications, users, engagement)
 * - Search insights (most searched terms)
 * - Popular jobs (most viewed listings)
 * - Application funnel metrics
 *
 * @returns Analytics data and loading state
 */
export const useAnalytics = () => {
  const [platformMetrics, setPlatformMetrics] = useState<PlatformMetrics | null>(null);
  const [searchInsights, setSearchInsights] = useState<SearchInsight[]>([]);
  const [popularJobs, setPopularJobs] = useState<PopularJob[]>([]);
  const [applicationMetrics, setApplicationMetrics] = useState<ApplicationMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch all analytics endpoints in parallel
        const [
          platformResponse,
          searchResponse,
          jobsResponse,
          applicationsResponse,
        ] = await Promise.all([
          axios.get('/api/analytics/platform-metrics'),
          axios.get('/api/analytics/search-insights?limit=10&days=30'),
          axios.get('/api/analytics/popular-jobs?limit=10&days=30'),
          axios.get('/api/analytics/application-metrics?days=30'),
        ]);

        // Extract data from responses
        setPlatformMetrics(platformResponse.data.data);
        setSearchInsights(searchResponse.data.data);
        setPopularJobs(jobsResponse.data.data);
        setApplicationMetrics(applicationsResponse.data.data);
      } catch (err: any) {
        const errorMessage = err.response?.data?.message || 'Failed to fetch analytics data';
        setError(errorMessage);

        notifications.show({
          title: 'Error',
          message: errorMessage,
          color: 'red',
        });

        console.error('Analytics fetch error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalytics();
  }, []); // Run once on mount

  return {
    platformMetrics,
    searchInsights,
    popularJobs,
    applicationMetrics,
    isLoading,
    error,
  };
};
