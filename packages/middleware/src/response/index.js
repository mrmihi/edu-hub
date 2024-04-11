import os from 'os';
import context from 'express-http-context';
import { correlationId, hostName } from '@app/constants';

export const responseInterceptor = (_req, res, next) => {
  if (res.headersSent) return;
  res.set(hostName, os.hostname());
  res.set(correlationId, context.get('correlationId'));
  next();
};

export const toSuccess = ({ res, status = 200, data, message }) => {
  responseInterceptor({}, res, () => {});
  if (res.polyglot) message = res.polyglot.t(message);
  const responseData = { data, message };
  if (!data) delete responseData.data;
  res.status(status).json(responseData);
};
