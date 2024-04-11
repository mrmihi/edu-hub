import { axiosInstance, apiRequest } from './core/axios';

export const emailOrderReport = (showLoader) => {
  return apiRequest(() => axiosInstance.get(`/api/v1/reports/orders`), showLoader);
};
