import { axiosInstance, apiRequest } from './core/axios';

export const getSingleProduct = async (id) => {
  return await apiRequest(() => axiosInstance.get(`/api/v1/products/${id}`));
};

export const getAllProducts = async (filterQuery = '', sortQuery = '', page = 1) => {
  return await apiRequest(() => axiosInstance.get(`/api/v1/products?${filterQuery}&${sortQuery}page=${page}&limit=${20}`));
};

export const getAllProductsWithoutPagination = async (filterQuery = '', sortQuery = '') => {
  return await apiRequest(() => axiosInstance.get(`/api/v1/products?${filterQuery}&${sortQuery}`));
};

export const createProduct = async (data) => {
  return await apiRequest(() => axiosInstance.post(`/api/v1/products`, data));
};

export const updateProduct = async (id, data) => {
  return await apiRequest(() => axiosInstance.patch(`/api/v1/products/${id}`, data));
};

export const deleteProduct = async (id) => {
  return await apiRequest(() => axiosInstance.delete(`/api/v1/products/${id}`));
};
