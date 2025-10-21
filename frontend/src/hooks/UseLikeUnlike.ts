import { addLike, removeLike } from "@/store/cardSlice";
import { TCards } from "@/Types";
import axios from "axios";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export function useLikeUnlike() {
    const dispatch = useDispatch();
    const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8181";
    
    const toggleLike = useCallback(async (card:TCards, userID:string, isLiked:boolean) => {
        
        // update Redux slice
            

        // update API
            try {
                const token = localStorage.getItem("token") || sessionStorage.getItem("token");

                axios.defaults.headers.common["x-auth-token"] = token;
                const response = await axios.patch(
                    `${API_BASE_URL}/api/listings/${card._id}`,
                );

                if (isLiked){ 
                    dispatch(removeLike({card : response.data, userID}))
                    toast.warning('Listing unliked!');                
                } else {
                    dispatch(addLike({card : response.data, userID}));
                    toast.success('Listing liked!');
                }
            } catch (error) {
                toast.error(`Error liking/unliking listing:${  error}`);
            }
            
            return !isLiked;
    }, [dispatch]);
    
    return toggleLike;
}
