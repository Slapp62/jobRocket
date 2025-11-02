import axios from 'axios';
import { toast } from 'react-toastify';
import { TListing } from '@/Types';

export function useDeleteListing() {
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8181';

  const deleteListing = async (listing: TListing) => {
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const response = await axios.delete(`${API_BASE_URL}/api/listings/${listing._id}`, {
        headers: {
          'x-auth-token': token,
        },
      });
      if (response.status === 200) {
        toast.success(`Listing deleted successfully`, { position: 'bottom-right' });
      }
    } catch (error: any) {
      toast.error(`Error deleting listing: ${error}`, { position: 'bottom-right' });
    }
  };

  return deleteListing;
}
