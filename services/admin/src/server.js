import initializeServer from '@app/server';
import config from './config';

initializeServer({
  service: 'Admin service',
  database: true,

  config,
});
