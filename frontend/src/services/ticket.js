import { axiosInstance, apiRequest } from './core/axios';

export const createTicket = async (ticket) => {
  return await apiRequest(() => axiosInstance.post(`/api/v1/tickets/`, ticket));
};

export const getAllTickets = async (filterQuery = '', sortQuery = '', page = 1) => {
  return await apiRequest(() => axiosInstance.get(`/api/v1/tickets?${filterQuery}&${sortQuery}page=${page}&limit=${20}`));
};

export const getTicket = async (ticketId) => {
  return await apiRequest(() => axiosInstance.get(`/api/v1/tickets/${ticketId}`));
};

export const addReply = async (ticketId, message) => {
  return await apiRequest(() => axiosInstance.post(`/api/v1/tickets/${ticketId}/reply`, { message }));
};

export const closeTicket = async (ticketId) => {
  return await apiRequest(() => axiosInstance.patch(`/api/v1/tickets/${ticketId}/close`));
};
