import express from 'express';
import { celebrate, Segments } from 'celebrate';
import { default as filterQuery } from '@sliit-foss/mongoose-filter-query';
import { tracedAsyncHandler, traced } from '@sliit-foss/functions';
import { objectIdSchema } from '@app/constants';
import { toSuccess } from '@app/middleware';
import { serviceCreateCourse, serviceGetAllCourses, serviceGetSingleCourse, serviceUpdateSingleCourse, serviceDeleteSingleCourse, serviceInitiateCoursePayment, serviceVerifyCoursePayment } from './service';
import { createCourseSchema, updateCourseSchema } from './schema';

const course = express.Router();

course.post(
  '/',
  celebrate({ [Segments.BODY]: createCourseSchema }),
  tracedAsyncHandler(async function createCourseController(req, res) {
    const course = await traced(serviceCreateCourse)(req.body, req.headers['x-user-id']);
    return toSuccess({
      res,
      status: 201,
      data: course,
      message: 'Course successfully created',
    });
  }),
);

course.get(
  '/',
  filterQuery,
  tracedAsyncHandler(async function controllerGetAllCourses(req, res) {
    const course = await traced(serviceGetAllCourses)(req.query.filter, req.query.sort, req.query.page, req.query.limit);
    return toSuccess({
      res,
      data: course,
      message: 'Courses successfully fetched',
    });
  }),
);

course.get(
  '/:id',
  celebrate({ [Segments.PARAMS]: objectIdSchema() }),
  tracedAsyncHandler(async function controllerGetCourse(req, res) {
    const course = await traced(serviceGetSingleCourse)(req.params.id);
    return toSuccess({
      res,
      data: course,
      message: 'Course successfully fetched',
    });
  }),
);

course.delete(
  '/:id',
  celebrate({ [Segments.PARAMS]: objectIdSchema() }),
  tracedAsyncHandler(async function controllerSingleCourseDelete(req, res) {
    const course = await traced(serviceDeleteSingleCourse)(req.params.id);
    return toSuccess({
      res,
      data: course,
      message: 'Course successfully deleted',
    });
  }),
);

course.patch(
  '/:id',
  celebrate({ [Segments.PARAMS]: objectIdSchema(), [Segments.BODY]: updateCourseSchema }),
  tracedAsyncHandler(async function controllerSingleCourseUpdate(req, res) {
    const course = await traced(serviceUpdateSingleCourse)(req.params.id, req.body);
    return toSuccess({
      res,
      data: course,
      message: 'Course successfully updated',
    });
  }),
);
export default course;
