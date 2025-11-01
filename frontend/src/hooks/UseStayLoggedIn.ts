import { useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { setUser } from '@/store/userSlice';
import { TdecodedToken } from '@/Types';

const useStayLoggedIn = () => {
  const dispatch = useDispatch();
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8181';

  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');

    if (!token) {
      return;
    }

    axios.defaults.headers.common['x-auth-token'] = token;

    const { _id } = jwtDecode<TdecodedToken>(token);

    const dispatchUser = async () => {
      const response = await axios.get(`${API_BASE_URL}/api/users/${_id}`);
      const userData = response.data;
      dispatch(setUser(userData));
    };
    dispatchUser();
  }, []);
};

export default useStayLoggedIn;
