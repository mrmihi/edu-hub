import context from 'express-http-context';
import createError from 'http-errors';
import { asyncHandler, tracedAsyncHandler } from '@sliit-foss/functions';
import { moduleLogger } from '@sliit-foss/module-logger';
import { whitelistedRoutes } from '@app/constants';
import { getAuthUser } from '../services';

const logger = moduleLogger('Auth-middleware');

const whitelistedModuleRoutes = ['/v1/authentication','/v1/learner','/v1/feedback','/v1/scheduling','/v1/scheduling','/v1/report'];

export const authorizer = tracedAsyncHandler(async function authorizer(req) {
  if (!req.ignoreWhitelists && [...whitelistedRoutes,...whitelistedModuleRoutes].find((route) => req.path.match(new RegExp(route)))) {
    return;
  }
  context.set('headers', req.headers);
  const user = await getAuthUser();
  req.user = user;
  req.headers['x-user-id'] = user._id;
  req.headers['x-user-role'] = user.role;
  req.headers['x-user-email'] = user.email;
});

export const permittedRoles = (roles) =>
  asyncHandler(function roleGuard(req) {
    if (roles && !roles.includes(req.user.role)) {
      logger.error(`Forbidden route - access denied - user_id: ${req.user._id} - role: ${req.user.role}`);
      throw createError(403, 'Route forbidden');
    }
  });
