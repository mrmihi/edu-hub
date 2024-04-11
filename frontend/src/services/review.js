import { axiosInstance, apiRequest } from './core/axios';

export const addProductRating = async (id, rating) => {
  return await apiRequest(() =>
    axiosInstance.post(`/api/v1/reviews`, {
      entity_id: id,
      entity_type: 'product',
      rating,
    }),
  );
};

export const addSellerRating = async (id, rating) => {
  return await apiRequest(() =>
    axiosInstance.post(`/api/v1/reviews`, {
      entity_id: id,
      entity_type: 'seller',
      rating,
    }),
  );
};
