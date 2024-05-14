import { Joi } from 'celebrate';
import { roles } from '@app/constants';

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&^()._*?]{8,30}$/)
    .required()
    .error((errors) =>
      errors.map((err) => {
        if (err.code === 'string.pattern.base')
          err.message = `Password should have at least one lowercase letter, one uppercase letter, one number and one special character and should be at least 8 characters long`;
        return err;
      }),
    ),
  role: Joi.string().valid(roles.admin, roles.instructor, roles.learner).optional().default(roles.learner),
  mobile: Joi.string()
    .pattern(/^[0-9]\d{9}$/)
    .required(),
  address: Joi.string().required(),
  business: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    license_number: Joi.string().required(),
    owner_nic: Joi.string().required(),
  }).when('role', {
    is: roles.learner,
    then: Joi.required(),
    otherwise: Joi.optional(),
  }),
});

export const refreshTokenSchema = Joi.object({
  refresh_token: Joi.string().required(),
});

export const resetPasswordSchema = {
  new_password: Joi.string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&^()._*?]{8,30}$/)
    .required()
    .error((errors) =>
      errors.map((err) => {
        if (err.code === 'string.pattern.base')
          err.message = `Password should have at least one lowercase letter, one uppercase letter, one number and one special character and should be at least 8 characters long`;
        return err;
      }),
    ),
};

export const validUserResetPasswordSchema = {
  code: Joi.string().required(),
};
