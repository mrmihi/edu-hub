import serviceConnector from '@sliit-foss/service-connector';
import config from '../config';

const connector = serviceConnector({
  baseURL: config.COURSE_SERVICE_BASE_URL,
  service: 'Course-Service',
});

export const getCoursesByIds = (ids = [], v = 'v1') => {
  return connector.get(`/api/${v}/courses?filter[_id]=in(${ids.join(',')})`).then(connector.resolve);
};

export const updateCoursesByIds = (ids = [], payload, v = 'v1') => {
  return connector.patch(`/api/${v}/courses?filter[_id]=in(${ids.join(',')})`, payload).then(connector.resolve);
};
