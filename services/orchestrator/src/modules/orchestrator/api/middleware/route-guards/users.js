import { roles } from '@app/constants';
import { permittedRoles } from '../../../../../middleware';

const guard = (req, res, next) => {
  if (req.path.match(new RegExp('/v1/users/*')) && req.params[0]?.replace('/', '') === req.user._id) return next();
  return permittedRoles([roles.admin])(req, res, next);
};

export default guard;
