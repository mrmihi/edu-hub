import serviceConnector from '@sliit-foss/service-connector';
import config from '../config';

const connector = serviceConnector({
  baseURL: config.PAYMENT_SERVICE_BASE_URL,
  service: 'Payment-Service',
});

export const makePayment = (payload = [], v = 'v1') => {
  return connector.post(`/api/${v}/payments`, payload).then(connector.resolve);
};

export const getPayment = (id, v = 'v1') => {
  return connector.get(`/api/${v}/payments/${id}`).then(connector.resolve);
};

export const transferPayment = (id, payload, v = 'v1') => {
  return connector.post(`/api/${v}/payments/${id}/transfer`, payload).then(connector.resolve);
};
