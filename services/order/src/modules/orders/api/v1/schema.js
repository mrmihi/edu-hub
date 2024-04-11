import { Joi } from 'celebrate';
import { orderStatuses } from '@app/constants';

export const createOrderSchema = Joi.object({
  courses: Joi.array()
    .items(
      Joi.object({
        _id: Joi.string().hex().length(24).required(),
        quantity: Joi.number().required(),
      }),
    )
    .required(),
});

export const updateOrderSchema = Joi.object({
  courses: Joi.array()
    .items(
      Joi.object({
        _id: Joi.string().hex().length(24).required(),
        quantity: Joi.number().required(),
      }),
    )
    .optional(),
  status: Joi.string()
    .valid(...Object.values(orderStatuses))
    .optional(),
});
