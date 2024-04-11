import initializeServer from '@app/server';
import config from './config';

initializeServer({
  service: 'Order service',
  database: true,
  config,
});
