import express from 'express';
import { celebrate, Segments } from 'celebrate';
import { default as filterQuery } from '@sliit-foss/mongoose-filter-query';
import { tracedAsyncHandler, traced } from '@sliit-foss/functions';
import { objectIdSchema } from '@app/constants';
import { toSuccess } from '@app/middleware';
import { serviceCreateOrder, serviceGetAllOrders, serviceGetSingleOrder, serviceUpdateSingleOrder, serviceDeleteSingleOrder, serviceInitiateOrderPayment, serviceVerifyOrderPayment } from './service';
import { createOrderSchema, updateOrderSchema } from './schema';

const order = express.Router();

order.post(
  '/',
  celebrate({ [Segments.BODY]: createOrderSchema }),
  tracedAsyncHandler(async function createOrderController(req, res) {
    const order = await traced(serviceCreateOrder)(req.body, req.headers['x-user-id']);
    return toSuccess({
      res,
      status: 201,
      data: order,
      message: 'Order successfully created',
    });
  }),
);

order.get(
  '/',
  filterQuery,
  tracedAsyncHandler(async function controllerGetAllOrders(req, res) {
    const order = await traced(serviceGetAllOrders)(req.query.filter, req.query.sort, req.query.page, req.query.limit);
    return toSuccess({
      res,
      data: order,
      message: 'Orders successfully fetched',
    });
  }),
);

order.get(
  '/:id',
  celebrate({ [Segments.PARAMS]: objectIdSchema() }),
  tracedAsyncHandler(async function controllerGetOrder(req, res) {
    const order = await traced(serviceGetSingleOrder)(req.params.id);
    return toSuccess({
      res,
      data: order,
      message: 'Order successfully fetched',
    });
  }),
);

order.delete(
  '/:id',
  celebrate({ [Segments.PARAMS]: objectIdSchema() }),
  tracedAsyncHandler(async function controllerSingleOrderDelete(req, res) {
    const order = await traced(serviceDeleteSingleOrder)(req.params.id);
    return toSuccess({
      res,
      data: order,
      message: 'Order successfully deleted',
    });
  }),
);

order.patch(
  '/:id',
  celebrate({ [Segments.PARAMS]: objectIdSchema(), [Segments.BODY]: updateOrderSchema }),
  tracedAsyncHandler(async function controllerSingleOrderUpdate(req, res) {
    const order = await traced(serviceUpdateSingleOrder)(req.params.id, req.body);
    return toSuccess({
      res,
      data: order,
      message: 'Order successfully updated',
    });
  }),
);

order.post(
  '/:id/payment',
  celebrate({ [Segments.PARAMS]: objectIdSchema() }),
  tracedAsyncHandler(async function controllerInitiateOrderPayment(req, res) {
    const data = await traced(serviceInitiateOrderPayment)(req.params.id, req.headers['x-user-id']);
    return toSuccess({
      res,
      data: data,
      message: 'Payment initialized successfully',
    });
  }),
);

order.get(
  '/:id/payment/verify',
  celebrate({ [Segments.PARAMS]: objectIdSchema() }),
  tracedAsyncHandler(async function controllerVerifyOrderPayment(req, res) {
    const data = await traced(serviceVerifyOrderPayment)(req.params.id);
    return toSuccess({
      res,
      data: data,
      message: 'Payment verified successfully',
    });
  }),
);

export default order;
