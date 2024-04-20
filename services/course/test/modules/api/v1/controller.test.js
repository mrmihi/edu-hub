import * as httpMocks from 'node-mocks-http';
import * as courseService from '../../../../src/modules/courses/api/v1/service';
import { default as courseController } from '../../../../src/modules/courses/api/v1/controller';
import { mockAddCourseRequestBody } from '../../../__mocks__';

describe('course-controller-tests', () => {
  const next = jest.fn();

  it('01. should add an course successfully', () => {
    jest.spyOn(courseService, 'serviceCreateCourse').mockResolvedValue(true);
    const req = httpMocks.createRequest({
      method: 'post',
      url: '/',
      body: mockAddCourseRequestBody,
    });
    const res = httpMocks.createResponse();
    courseController(req, res, next);
    expect(res.statusCode).toBe(200);
  });
});
