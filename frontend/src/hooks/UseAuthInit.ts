import axios from "axios";
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { setUser } from "@/store/userSlice";
import { TdecodedToken } from "@/Types";
import { useEffect } from "react";
import { toast } from "react-toastify";

export function useAuthInit() {
  const dispatch = useDispatch();

    useEffect(() => {
        const tokenHandler = async () => {
            const token = localStorage.getItem('token');

            if (token !== null) {
                try {
                    const decodedToken = jwtDecode<TdecodedToken>(token);
                    const id = decodedToken._id;

                    axios.defaults.headers.common['x-auth-token'] = token;
                    const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8181";
                    const userData = await axios.get(`${API_BASE_URL}/api/users/${id}`)

                    dispatch(setUser(userData.data));
                } catch (error : any) {
                toast.error('Could not auto-login in. Please login again.', error.response.data)
                }
            }
        }
      
        const handleBeforeUnload = () => {
            const rememberMe = localStorage.getItem('rememberMe');
            
            if (!rememberMe) {
            localStorage.removeItem('token');
            localStorage.removeItem('rememberMe');
            }
        }

      
        window.addEventListener('beforeunload', handleBeforeUnload);
        tokenHandler();
    }, [dispatch])
}