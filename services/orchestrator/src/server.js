import initializeServer from '@app/server';
import { default as translations } from './locales';
import { defaultLimiter as rateLimiter, authorizer } from './middleware';
import routes from './routes';
import config from './config';

initializeServer({
  service: 'Orchestrator',
  routes,
  leadingMiddleware: [
    authorizer,
    rateLimiter],
  cors: true,
  translations,
  config,
});
