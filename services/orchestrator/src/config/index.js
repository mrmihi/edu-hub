import { Joi } from 'celebrate';
import { moduleLogger } from '@sliit-foss/module-logger';

const logger = moduleLogger('Config');

class Base {
  static get schema() {
    return {
      PORT: Joi.number().optional(),
      COURSE_SERVICE_BASE_URL: Joi.string().required(),
      USER_SERVICE_BASE_URL: Joi.string().required(),
      AUTH_SERVICE_BASE_URL: Joi.string().required(),
      PAYMENT_SERVICE_BASE_URL: Joi.string().required(),
      ORDER_SERVICE_BASE_URL: Joi.string().required(),
      FEEDBACK_SERVICE_BASE_URL: Joi.string().required(),
      SCHEDULING_SERVICE_BASE_URL: Joi.string().required(),
      AUTHENTICATION_SERVICE_BASE_URL: Joi.string().required(),
      LEARNER_SERVICE_BASE_URL: Joi.string().required(),
      REPORT_SERVICE_BASE_URL: Joi.string().required()
    };
  }
  static get values() {
    return {
      PORT: process.env.PORT ?? 2002,
      COURSE_SERVICE_BASE_URL: process.env.COURSE_SERVICE_BASE_URL,
      USER_SERVICE_BASE_URL: process.env.USER_SERVICE_BASE_URL,
      AUTH_SERVICE_BASE_URL: process.env.AUTH_SERVICE_BASE_URL,
      PAYMENT_SERVICE_BASE_URL: process.env.PAYMENT_SERVICE_BASE_URL,
      ORDER_SERVICE_BASE_URL: process.env.ORDER_SERVICE_BASE_URL,
      FEEDBACK_SERVICE_BASE_URL: process.env.FEEDBACK_SERVICE_BASE_URL,
      SCHEDULING_SERVICE_BASE_URL: process.env.SCHEDULING_SERVICE_BASE_URL,
      AUTHENTICATION_SERVICE_BASE_URL: process.env.AUTHENTICATION_SERVICE_BASE_URL,
      LEARNER_SERVICE_BASE_URL: process.env.LEARNER_SERVICE_BASE_URL,
      REPORT_SERVICE_BASE_URL: process.env.REPORT_SERVICE_BASE_URL
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
