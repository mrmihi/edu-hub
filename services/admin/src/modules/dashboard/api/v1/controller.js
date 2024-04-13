import express from 'express';
import { tracedAsyncHandler, traced } from '@sliit-foss/functions';
import { toSuccess } from '@app/middleware';
import { getSystemTotalsSvc, getProfitsSvc } from './service';

const dashboard = express.Router();

dashboard.get(
  '/totals',
  tracedAsyncHandler(async function getSystemTotalsController(_req, res) {
    const data = await traced(getSystemTotalsSvc)();
    return toSuccess({
      res,
      data: data,
      message: 'Totals fetched successfully',
    });
  }),
);

dashboard.get(
  '/profits',
  tracedAsyncHandler(async function getProfitsController(_req, res) {
    const data = await traced(getProfitsSvc)();
    return toSuccess({
      res,
      data: data,
      message: 'Profit data fetched successfully',
    });
  }),
);

export default dashboard;
