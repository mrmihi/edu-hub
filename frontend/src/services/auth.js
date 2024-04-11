import { axiosInstance, apiRequest } from './core/axios';

export const login = (data, showLoader) => {
  return apiRequest(() => axiosInstance.post(`/api/v1/auth/login`, data), showLoader);
};

export const register = (data, showLoader) => {
  return apiRequest(() => axiosInstance.post(`/api/v1/auth/register`, data), showLoader);
};

export const forgotPassword = (data, showLoader) => {
  return apiRequest(() => axiosInstance.post(`/api/v1/auth/forgot-password`, data), showLoader);
};

export const resetPassword = (code, data, showLoader) => {
  return apiRequest(() => axiosInstance.post(`/api/v1/auth/reset-password/${code}`, data), showLoader);
};

export const getCurrentUser = (showLoader) => {
  return apiRequest(() => axiosInstance.get(`/api/v1/auth/current`), showLoader);
};

export const verify = (code, showLoader) => {
  return apiRequest(() => axiosInstance.get(`/api/v1/auth/verify/${code}`), showLoader);
};

export const logout = (showLoader) => {
  return apiRequest(() => axiosInstance.post(`/api/v1/auth/logout`), showLoader).then((data) => {
    if (!data) return;
    localStorage.clear();
    sessionStorage.clear();
  });
};

export const refreshToken = () => {
  const store = localStorage.getItem('refresh_token') ? localStorage : sessionStorage;
  return apiRequest(() => axiosInstance.post(`/api/v1/auth/refresh-token`, { refresh_token: store.getItem('refresh_token') }), false).then((data) => {
    if (!data) return;
    store.setItem('access_token', data.data.access_token);
    store.setItem('refresh_token', data.data.refresh_token);
  });
};
