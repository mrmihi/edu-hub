import context from 'express-http-context';
import serviceConnector from '@sliit-foss/service-connector';
import config from '../config';

const connector = serviceConnector({
  baseURL: config.AUTH_SERVICE_BASE_URL,
  service: 'Auth-Service',
  headerIntercepts: () => ({
    authorization: context.get('headers')?.authorization,
  }),
});

export const getAuthUser = (v = 'v1') => {
  return connector.get(`/api/${v}/auth/current`).then(connector.resolve);
};
