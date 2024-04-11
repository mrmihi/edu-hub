import { isEmpty } from 'lodash';
import { aggregatePopulate } from '@app/mongoose';
import { Course } from './api/v1/models';

export const createCourse = (course) => {
  return Course.create(course);
};

export const getSingleCourse = (id) => {
  return Course.findById(id).lean();
};

export const getAllCourses = ({ filters = {}, sorts: sort = {}, page, limit }) => {
  if (page && limit) {
    const pipeline = [...aggregatePopulate(['users', 'user'])];
    if (!isEmpty(filters)) {
      pipeline.unshift({
        $match: filters,
      });
    }
    if (!isEmpty(sort)) {
      pipeline.unshift({
        $sort: sort,
      });
    }
    const aggregate = Course.aggregate(pipeline);
    return Course.aggregatePaginate(aggregate, {
      page,
      limit,
    });
  }
  return Course.find(filters).sort(sort).lean();
};

export const deleteSingleCourse = (id) => {
  return Course.findByIdAndDelete(id);
};

export const updateSingleCourse = (id, pr) => {
  return Course.findByIdAndUpdate(id, pr, {
    new: true,
  }).lean();
};
