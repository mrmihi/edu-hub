import { Joi } from 'celebrate';

export const initializePaymentSchema = Joi.object({
  amount: Joi.number().required(),
  metadata: Joi.object().optional().default({}),
  customer: Joi.object({
    name: Joi.string().required(),
  }).required(),
});

export const transferPaymentSchema = Joi.object({
  amount: Joi.number().required(),
  destination_account_id: Joi.string().required(),
});
