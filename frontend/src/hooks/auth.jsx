import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { default as jwtDecode } from 'jwt-decode';
import { setAuthUser } from '../store/data/user';

const protectedRoutes = ['payment', 'payment-confirmation', 'dashboard', 'orders', 'tickets'];

const useAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();

  const checkUser = () => {
    const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
    if (!token && protectedRoutes.includes(window.location.pathname.split('/')[1])) {
      navigate('/login');
    }
    if (token) {
      const user = jwtDecode(token);
      dispatch(setAuthUser(user));
    }
  };

  useEffect(() => {
    checkUser();
  }, [location]);
};

export default useAuth;
