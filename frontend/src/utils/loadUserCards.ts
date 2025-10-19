import axios from "axios";
import { toast } from "react-toastify";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8181";

export const loadUserCards = async () => {
  try {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const response = await axios.get(
        `${API_BASE_URL}/api/cards/my-cards`,
        {headers: {'x-auth-token': token}}
    );
    return response.data;
} catch (error : any) {
    toast.error(error);
  }  
}