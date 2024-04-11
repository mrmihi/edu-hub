import createError from 'http-errors';
import { groupBy, isEqual } from 'lodash';
import { traced } from '@sliit-foss/functions';
import { moduleLogger } from '@sliit-foss/module-logger';
import { orderStatuses } from '@app/constants';
import { createOrder, getAllOrders, getSingleOrder, deleteSingleOrder, updateSingleOrder, findUserLatestOrder } from '../../repository';
import { getPayment, getCoursesByIds, updateCoursesByIds, getUserById, makePayment, sendEmail, transferPayment } from '../../../../services';
import { calculateTotals } from './helpers/index';
import { constructReceiptEmailPayload } from './mappers';

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

export const serviceInitiateOrderPayment = async (id, userId) => {
  const order = await serviceGetSingleOrder(id);
  if (!order) {
    throw createError(404, 'Order not found');
  }
  if (order.status === orderStatuses.paid) throw createError(400, 'Payment already made for this order');
  const customer = await getUserById(order.user.toString());
  const payment = await traced(makePayment)({
    amount: order.total,
    metadata: {
      order_id: id,
      user_id: userId,
    },
    customer: {
      name: customer.name,
      address: customer.address,
    },
  });
  serviceUpdateSingleOrder(id, { payment_id: payment.id });
  return payment;
};

export const serviceVerifyOrderPayment = async (id) => {
  const order = await serviceGetSingleOrder(id);
  if (!order) {
    throw createError(404, 'Order not found');
  }
  const payment = await getPayment(order.payment_id);
  if (payment.status === 'succeeded') {
    serviceUpdateSingleOrder(id, { status: orderStatuses.paid });
    getUserById(order.user.toString()).then((customer) => {
      sendEmail(constructReceiptEmailPayload(customer.email, order));
    });
    const courseIds = order.products.map((product) => product._id);
    const [courses] = await Promise.all([
      getCoursesByIds(courseIds),
      updateCoursesByIds(courseIds, {
        $inc: { stock: -1 },
      }),
    ]);
    const instructors = groupBy(courses, (course) => course.instructor);
    for (let instructor of Object.keys(instructors)) {
      instructor = await getUserById(instructor);
      if (!instructor.business?.bank_account) logger.warn('seller bank account not configured, payment transfer skipped');
      const transferAmount = instructors[instructor].reduce((total, course) => {
        total += course.paymentDetails.pri * order.courses.find((cId) => cId === course._id).quantity ?? 1;
        return total;
      }, 0);
      traced(transferPayment)({
        amount: transferAmount,
        destination_account_id: instructor.business?.bank_account,
      }).then((data) => serviceUpdateSingleOrder(id, { payment_transfer_id: data.id }));
    }
    return { payment_status: true };
  }
  return { payment_status: false };
};
