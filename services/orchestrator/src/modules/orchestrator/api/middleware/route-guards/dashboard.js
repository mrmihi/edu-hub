import { roles } from '@app/constants';
import { permittedRoles } from '../../../../../middleware';

const guard = (req, res, next) => {
  return permittedRoles([roles.admin])(req, res, next);
};

export default guard;
