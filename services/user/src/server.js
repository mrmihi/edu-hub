import initializeServer from '@app/server';
import config from './config';

initializeServer({
  service: 'User service',
  database: true,
  config,
});
