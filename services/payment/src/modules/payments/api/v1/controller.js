import express from 'express';
import { celebrate, Segments } from 'celebrate';
import { tracedAsyncHandler, traced } from '@sliit-foss/functions';
import { toSuccess } from '@app/middleware';
import { serviceInitializePayment, serviceRetrievePayment, serviceTransferPayment } from './service';
import { initializePaymentSchema, transferPaymentSchema } from './schema';

const payment = express.Router();

payment.post(
  '/',
  celebrate({ [Segments.BODY]: initializePaymentSchema }),
  tracedAsyncHandler(async function controllerInitiatePayment(req, res) {
    const data = await traced(serviceInitializePayment)(req.body);
    return toSuccess({ status: 201, res, message: 'Payment initialized', data });
  }),
);

payment.get(
  '/:id',
  tracedAsyncHandler(async function controllerRetrievePayment(req, res) {
    const data = await traced(serviceRetrievePayment)(req.params.id);
    return toSuccess({ res, message: 'Payment retrieved successfully', data });
  }),
);

payment.post(
  '/:id/transfer',
  celebrate({ [Segments.BODY]: transferPaymentSchema }),
  tracedAsyncHandler(async function controllerTransferPayment(req, res) {
    const data = await traced(serviceTransferPayment)(req.params.id, req.body);
    return toSuccess({ res, message: 'Payment transferred successfully', data });
  }),
);

export default payment;
