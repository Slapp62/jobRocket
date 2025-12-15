import { ChangeEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import { notifications } from '@mantine/notifications';
import { TListing } from '@/Types';

export const getParamsInfo = (endpoint: string, isDesktop?: boolean) => {
  const [searchParams, setSearchParams] = useSearchParams();
  // Local state for search results
  const [listings, setListings] = useState<TListing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  // Get sortOption and selected listing from URL
  const sortOption = searchParams.get('sortOption') || '';
  const selectedId = searchParams.get('selected');
  // Pagination info from backend
  const [paginationInfo, setPaginationInfo] = useState({
    currentPage: 1,
    totalPages: 1,
    totalResults: 0,
    perPage: 20,
    hasNextPage: false,
    hasPrevPage: false,
  });

  // Create a stable key for search params that excludes 'selected'
  // This ensures changing selectedId doesn't trigger a refetch
  const searchParamsKey = Array.from(searchParams.entries())
    .filter(([key]) => key !== 'selected')
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  // Fetch search results when URL params change
  useEffect(() => {
    const fetchSearchResults = async () => {
      setIsLoading(true);
      try {
        // Build params object (exclude 'selected' from backend query)
        const params: Record<string, string | number> = {};
        searchParams.forEach((value, key) => {
          if (key !== 'selected') {
            params[key] = value;
          }
        });

        // ADD pagination params
        params.page = currentPage;
        // Set limit for desktop (selectedId doesn't affect fetching)
        params.limit = isDesktop ? 100 : paginationInfo.perPage;

        const response = await axios.get(`/api/listings/${endpoint}`, { params });

        // NEW: Response now has { listings, pagination }
        setListings(response.data.listings);
        setPaginationInfo(response.data.pagination);
      } catch (error: any) {
        // Skip showing notification if the error was already handled (e.g., 410 session expired)
        if (!error.handled) {
          notifications.show({
            title: 'Error',
            message: error.response?.data?.message || error.message,
            color: 'red',
          });
        }
        setListings([]);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }
    };

    fetchSearchResults();
  }, [searchParamsKey, currentPage, endpoint, isDesktop]);

  // Listings are already sorted and paginated by backend
  const displayListings = listings;
  // Reset to page 1 when search params change (not when data arrives)
  // Using searchParamsKey ensures 'selected' changes don't reset page
  useEffect(() => {
    setCurrentPage(1);
  }, [searchParamsKey]);

  // Handle listing selection (for desktop split-panel)
  const handleSelectListing = (listingId: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('selected', listingId);
    setSearchParams(newParams);
  };

  // Handle back to all listings
  const handleBackToAll = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('selected');
    setSearchParams(params);
  };

  // Calculate pagination display info based on backend pagination
  const startCurrentListings = (paginationInfo.currentPage - 1) * paginationInfo.perPage + 1;
  const endCurrentListings = Math.min(
    startCurrentListings + displayListings.length - 1,
    paginationInfo.totalResults
  );
  const totalCurrentListings = paginationInfo.totalResults;
  const noListings = paginationInfo.totalResults === 0;

  // Helper to update search params
  const updateSearchParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    setSearchParams(params);
  };

  return {
    listings,
    isLoading,
    currentPage,
    setCurrentPage,
    sortOption,
    selectedId,
    paginationInfo,
    displayListings,
    startCurrentListings,
    endCurrentListings,
    totalCurrentListings,
    noListings,
    handleSelectListing,
    handleBackToAll,
    updateSearchParam,
    searchParams,
    setSearchParams,
  };
};
