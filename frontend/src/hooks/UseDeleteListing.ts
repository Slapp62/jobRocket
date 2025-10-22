import { removeListing, removeUserListing } from "@/store/listingSlice";
import { RootState } from "@/store/store";
import { TListing } from "@/Types";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export function useDeleteListing() {
    const dispatch = useDispatch();
    const globalListings = useSelector((state:RootState) => state.listingSlice.listings)
    const userListings = useSelector((state:RootState) => state.listingSlice.userListings)
    const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8181";

    const deleteListing = async (listing:TListing) => {
        try {
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');
            const response = await axios.delete(
                `${API_BASE_URL}/api/listings/${listing._id}`,
                {
                    headers: {
                        'x-auth-token': token
                    }
                }
            )
            if (response.status === 200){
                // update Redux
                const thisGlobalListing = globalListings?.find((globalListing) => globalListing._id === listing._id )
                const thisUserListing = userListings?.find((userListing) => userListing._id === listing._id )
                if (thisGlobalListing) {
                    dispatch(removeListing(thisGlobalListing))
                }
                if (thisUserListing) {
                    dispatch(removeUserListing(thisUserListing))
                }
                toast.success(`Listing deleted successfully`, {position: 'bottom-right'});
            }

        } catch (error:any){
            toast.error(`Error deleting listing: ${error}`, {position: 'bottom-right'});
        }
    }

    return deleteListing;
}
