import { isEmpty } from 'lodash';
import { orderStatuses } from '@app/constants';
import { aggregatePopulate } from '@app/mongoose';
import { Order } from './api/v1/models';

export const createOrder = (order) => {
  return Order.create(order);
};

export const getSingleOrder = (id) => {
  return Order.findById(id).lean();
};

export const findUserLatestOrder = (userId) => {
  return Order.findOne({ user: userId, status: orderStatuses.confirmed }).sort({ created_at: -1 }).lean();
};

export const getAllOrders = ({ filters = {}, sorts: sort = {}, page, limit }) => {
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
    const aggregate = Order.aggregate(pipeline);
    return Order.aggregatePaginate(aggregate, {
      page,
      limit,
    });
  }
  return Order.find(filters).sort(sort).lean();
};

export const deleteSingleOrder = (id) => {
  return Order.findByIdAndDelete(id);
};

export const updateSingleOrder = (id, pr) => {
  return Order.findByIdAndUpdate(id, pr, {
    new: true,
  }).lean();
};
