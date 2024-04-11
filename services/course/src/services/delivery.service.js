import serviceConnector from '@sliit-foss/service-connector';
import config from '../config';

const connector = serviceConnector({
  baseURL: config.DELIVERY_SERVICE_BASE_URL,
  service: 'Delivery-Service',
});

export const assignToDelivery = (payload, v = 'v1') => {
  return connector.post(`/api/${v}/orders`, payload).then(connector.resolve);
};
