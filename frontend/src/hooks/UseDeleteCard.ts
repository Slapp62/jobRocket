import { removeCard, removeUserCard } from "@/store/cardSlice";
import { RootState } from "@/store/store";
import { TCards } from "@/Types";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export function useDeleteCard() {
    const dispatch = useDispatch();
    const globalCards = useSelector((state:RootState) => state.cardSlice.cards)
    const userCards = useSelector((state:RootState) => state.cardSlice.userCards)
    const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8181";

    const deleteCard = async (card:TCards) => {
        try {
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');
            const response = await axios.delete(
                `${API_BASE_URL}/api/cards/${card._id}`, 
                {
                    headers: {
                        'x-auth-token': token
                    }
                }
            )
            if (response.status === 200){
                // update Redux
                const thisGlobalCard = globalCards?.find((globalCard) => globalCard._id === card._id )
                const thisUserCard = userCards?.find((userCard) => userCard._id === card._id )
                dispatch(removeCard(thisGlobalCard!))
                dispatch(removeUserCard(thisUserCard!))
                toast.success(`Card deleted successfully`, {position: 'bottom-right'});
            }

        } catch (error:any){ 
            toast.error(`Error deleting card: ${error}`, {position: 'bottom-right'});
        }
    }

    return deleteCard;
}