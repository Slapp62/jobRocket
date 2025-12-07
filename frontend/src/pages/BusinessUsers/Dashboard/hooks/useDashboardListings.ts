import { useState, useEffect } from 'react';
import { TListing } from '@/Types';
import { fetchBusinessListings } from '../utils/dashboardApi';
import { notifications } from '@mantine/notifications';

export const useDashboardListings = () => {
  // State
  const [listings, setListings] = useState<TListing[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Filters
  const [searchText, setSearchText] = useState('');
  const [industry, setIndustry] = useState<string | null>('all');
  const [activeFilter, setActiveFilter] = useState<string | null>('all'); // 'all', 'active', 'inactive'
  const [sortOption, setSortOption] = useState<string | null>('date-created-new');
  const [page, setPage] = useState(1);

  const getBusinessListings = async () => {
    setIsLoading(true)
    try {
      const data = await fetchBusinessListings({
        searchWord: searchText || undefined,
        industry,
        sortOption,
        page,
        limit: 20
      }) 
      setListings(data.listings);
    } catch (error : any) {
      notifications.show({
        title: 'Error',
        message: error.response?.data?.message || 'Failed to load listings',
        color: 'red',
      });
    } finally {
      setIsLoading(false)
    }
  }
  
  const removeListingById = (listingId : string)=> {
    return listings.filter((listing) => listing._id !== listingId)
  }

  useEffect(() => { 
    getBusinessListings();
  }, [searchText, sortOption, industry, page])

  const activeFilteredListings = listings.filter((listing) => {
    if (activeFilter === 'all') {return true;}
    if (activeFilter === 'active') {return listing.isActive === true;}
    if (activeFilter === 'inactive') {return listing.isActive === false;}
  })

  const sortFavorites = sortOption?.startsWith('favorites') ? 
    sortOption === 'favorites-least' ? 
    activeFilteredListings.sort((a,b) => (a.likes?.length || 0) - (b.likes?.length || 0))
    : activeFilteredListings.sort((a,b) => (b.likes?.length || 0) - (a.likes?.length || 0))
    : activeFilteredListings

  return {
    listings: sortFavorites,
    setListings,
    isLoading,
    searchText,
    industry,
    activeFilter,
    sortOption,
    page,
    setIndustry,  
    setSearchText,
    setActiveFilter,
    setSortOption,
    setPage,
    refetchListings: getBusinessListings ,
    removeListingById
  };
};