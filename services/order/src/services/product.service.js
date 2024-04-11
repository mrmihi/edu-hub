import serviceConnector from '@sliit-foss/service-connector';
import config from '../config';

const connector = serviceConnector({
  baseURL: config.PRODUCT_SERVICE_BASE_URL,
  service: 'Product-Service',
});

export const getProductsByIds = (ids = [], v = 'v1') => {
  return connector.get(`/api/${v}/products?filter[_id]=in(${ids.join(',')})`).then(connector.resolve);
};

export const updateProductsByIds = (ids = [], payload, v = 'v1') => {
  return connector.patch(`/api/${v}/products?filter[_id]=in(${ids.join(',')})`, payload).then(connector.resolve);
};
