/* eslint-disable import/named */

import { tracedAsyncHandler } from '@sliit-foss/functions';
import { whitelistedRoutes } from '@app/constants';
import { getUserById } from '../services';
import { Blacklist, verify, errors } from '../utils';

export const authorizer = tracedAsyncHandler(async function authorizer(req) {
  if (whitelistedRoutes.find((route) => req.path.match(new RegExp(route)))) {
    return;
  }
  const token = req.headers.authorization?.replace('Bearer ', '')?.replace('null', '');
  if (!token) {
    throw errors.missing_token;
  }
  const decodedUser = verify(token);
  const user = await getUserById(decodedUser._id);
  if (!user) {
    throw errors.invalid_token;
  }
  if (await Blacklist.has(token)) {
    throw errors.cancelled_token;
  }
  if (!user.is_active) {
    throw errors.user_deactivated;
  }
  req.user = user;
  req.token = token;
});
