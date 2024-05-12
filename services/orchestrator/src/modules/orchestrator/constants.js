import config from '../../config';

export const serviceHosts = {
  auth: config.AUTH_SERVICE_BASE_URL,
  users: config.USER_SERVICE_BASE_URL,
  emails: config.EMAIL_SERVICE_BASE_URL,
  sms: config.SMS_SERVICE_BASE_URL,
  products: config.PRODUCT_SERVICE_BASE_URL,
  courses: config.COURSE_SERVICE_BASE_URL,
  payments: config.PAYMENT_SERVICE_BASE_URL,
  orders: config.ORDER_SERVICE_BASE_URL,
  feedback: config.FEEDBACK_SERVICE_BASE_URL,
  scheduling: config.SCHEDULING_SERVICE_BASE_URL,
  reviews: config.REVIEW_SERVICE_BASE_URL,
  dashboard: config.ADMIN_SERVICE_BASE_URL,
  reports: config.REPORT_SERVICE_BASE_URL,
  tickets: config.SUPPORT_SERVICE_BASE_URL,
};
