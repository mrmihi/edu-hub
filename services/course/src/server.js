import initializeServer from '@app/server';
import config from './config';

initializeServer({
  service: 'Course service',
  database: true,
  config,
});
