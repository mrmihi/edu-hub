import { traced } from '@sliit-foss/functions';
import { moduleLogger } from '@sliit-foss/module-logger';
import { createCourse, getAllCourses, getSingleCourse, deleteSingleCourse, updateSingleCourse } from '../../repository';

const logger = moduleLogger('course-service');

export const serviceCreateCourse = (order, user) => {
  return traced(createCourse)({ ...order, user });
};

export const serviceGetAllCourses = (filters, sorts, page, limit) => {
  return traced(getAllCourses)({ filters, sorts, page, limit });
};

export const serviceGetSingleCourse = (id) => {
  return traced(getSingleCourse)(id);
};

export const serviceDeleteSingleCourse = (id) => {
  return traced(deleteSingleCourse)(id);
};

export const serviceUpdateSingleCourse = (id, payload) => {
  return traced(updateSingleCourse)(id, payload);
};
