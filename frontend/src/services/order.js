import { axiosInstance, apiRequest } from './core/axios';

export const placeOrder = async (products) => {
  return await apiRequest(() =>
    axiosInstance.post(`/api/v1/orders/`, {
      products,
    }),
  );
};

export const getAllOrders = async (filterQuery = '', sortQuery = '', page = 1) => {
  return await apiRequest(() => axiosInstance.get(`/api/v1/orders?${filterQuery}&${sortQuery}page=${page}&limit=${20}`));
};

export const getAllOrdersNoPagination = async (filterQuery = '', sortQuery = '') => {
  return await apiRequest(() => axiosInstance.get(`/api/v1/orders?${filterQuery}&${sortQuery}`));
};

export const makePayment = async (orderId) => {
  return await apiRequest(() => axiosInstance.post(`/api/v1/orders/${orderId}/payment`));
};

export const verifyPayment = async (orderId) => {
  return await apiRequest(() => axiosInstance.get(`/api/v1/orders/${orderId}/payment/verify`));
};
