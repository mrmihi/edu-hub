import { Joi } from 'celebrate';
import { createEnum } from './helpers';

export const correlationId = 'x-correlation-id';
export const hostName = 'x-host-name';

export const whitelistedRoutes = ['/v1/auth/login', '/v1/auth/register', '/v1/auth/refresh-token', '/v1/auth/verify/*', '/v1/auth/forgot-password', '/v1/auth/reset-password/*', '/v1/system/health'];

export const roles = createEnum(['admin', 'seller', 'buyer', 'customer-support']);

export const orderStatuses = createEnum(['confirmed', 'paid']);

export const objectIdSchema = (name = 'id') =>
  Joi.object({
    [name]: Joi.string().hex().length(24).required(),
  });

export const paymentStatuses = createEnum(['raw', 'initialized', 'cancelled', 'paid']);
