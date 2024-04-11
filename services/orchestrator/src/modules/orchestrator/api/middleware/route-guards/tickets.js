import { roles } from '@app/constants';
import { permittedRoles } from '../../../../../middleware';

const guard = (req, res, next) => {
  if (req.path.match(new RegExp('/v1/tickets/*')) && !req.path.includes('/close')) return next();
  return permittedRoles([roles.admin])(req, res, next);
};

export default guard;
