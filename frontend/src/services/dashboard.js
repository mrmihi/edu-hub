import { axiosInstance, apiRequest } from './core/axios';

export const getTotals = (showLoader) => {
  return apiRequest(() => axiosInstance.get(`/api/v1/dashboard/totals`), showLoader);
};

export const getProfitData = (showLoader) => {
  return apiRequest(() => axiosInstance.get(`/api/v1/dashboard/profits`), showLoader);
};
