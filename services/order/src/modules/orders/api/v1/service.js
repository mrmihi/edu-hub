import { isEqual } from 'lodash';
import { traced } from '@sliit-foss/functions';
import { moduleLogger } from '@sliit-foss/module-logger';
import { createOrder, getAllOrders, getSingleOrder, deleteSingleOrder, updateSingleOrder, findUserLatestOrder } from '../../repository';
import { calculateTotals } from './helpers/index';

const logger = moduleLogger('order-service');

export const serviceCreateOrder = async (order, user) => {
  const existingOrder = await findUserLatestOrder(user);
  if (existingOrder) {
    if (
      !isEqual(
        existingOrder.products.map((p) => p._id.toString()),
        order.products.map((p) => p._id),
      )
    ) {
      return serviceUpdateSingleOrder(existingOrder._id, { products: order.products });
    }
    return existingOrder;
  }
  await traced(calculateTotals)(order);
  return traced(createOrder)({ ...order, user });
};

export const serviceGetAllOrders = (filters, sorts, page, limit) => {
  return traced(getAllOrders)({ filters, sorts, page, limit });
};

export const serviceGetSingleOrder = (id) => {
  return traced(getSingleOrder)(id);
};

export const serviceDeleteSingleOrder = (id) => {
  return traced(deleteSingleOrder)(id);
};

export const serviceUpdateSingleOrder = async (id, payload) => {
  await traced(calculateTotals)(payload);
  return traced(updateSingleOrder)(id, payload);
};
