import serviceConnector from '@sliit-foss/service-connector';
import config from '../config';

const connector = serviceConnector({
  baseURL: config.USER_SERVICE_BASE_URL,
  service: 'User-Service',
});

export const getUserById = (id, v = 'v1') => {
  return connector.get(`/api/${v}/users/${id}`).then(connector.resolve);
};
