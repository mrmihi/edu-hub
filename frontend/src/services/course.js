import { axiosInstance, apiRequest } from './core/axios';

export const getSingleCourse = async (id) => {
  return await apiRequest(() => axiosInstance.get(`/api/v1/courses/${id}`));
};

export const getAllCourses = async (filterQuery = '', sortQuery = '', page = 1) => {
  return await apiRequest(() => axiosInstance.get(`/api/v1/courses?${filterQuery}&${sortQuery}page=${page}&limit=${20}`));
};

export const getAllCoursesWithoutPagination = async (filterQuery = '', sortQuery = '') => {
  return await apiRequest(() => axiosInstance.get(`/api/v1/courses?${filterQuery}&${sortQuery}`));
};

export const createCourse = async (data) => {
  return await apiRequest(() => axiosInstance.post(`/api/v1/courses`, data));
};

export const updateCourse = async (id, data) => {
  return await apiRequest(() => axiosInstance.patch(`/api/v1/courses/${id}`, data));
};

export const deleteCourse = async (id) => {
  return await apiRequest(() => axiosInstance.delete(`/api/v1/courses/${id}`));
};
