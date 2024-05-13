import { Joi } from 'celebrate';
import { moduleLogger } from '@sliit-foss/module-logger';

const logger = moduleLogger('Config');

class Base {
  static get schema() {
    return {
      PORT: Joi.number().optional(),
      JWT_SECRET: Joi.string().required(),
      ACCESS_TOKEN_EXPIRY: Joi.string().optional(),
      REFRESH_TOKEN_EXPIRY: Joi.string().optional(),
      USER_SERVICE_BASE_URL: Joi.string().required(),
      EMAIL_SERVICE_BASE_URL: Joi.string().required(),
      FRONTEND_BASE_URL: Joi.string().required(),
      REDIS_CONNECTION_STRING: Joi.string().required(),
    };
  }
  static get values() {
    return {
      PORT: process.env.PORT ?? 2001,
      JWT_SECRET: process.env.JWT_SECRET,
      ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY ?? '1d',
      REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY ?? '1d',
      USER_SERVICE_BASE_URL: process.env.USER_SERVICE_BASE_URL,
      EMAIL_SERVICE_BASE_URL: process.env.EMAIL_SERVICE_BASE_URL,
      FRONTEND_BASE_URL: process.env.FRONTEND_BASE_URL,
      REDIS_CONNECTION_STRING: process.env.REDIS_CONNECTION_STRING,
    };
  }
}

const config = Base.values;

const { error } = Joi.object(Base.schema).validate(config);

if (error) {
  logger.error(`Environment validation failed. \nDetails - ${error.details[0].message}\nExiting...`);
  process.exit(1);
}

export default config;
