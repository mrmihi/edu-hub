import express from 'express';
import serviceConnector from '@sliit-foss/service-connector';
import { tracedAsyncHandler } from '@sliit-foss/functions';
import { serviceHosts } from '../constants';
import { permittedRoles } from '../../../middleware';
import { routeGuards } from './middleware';

const orchestrator = express.Router();

const connector = serviceConnector({ service: 'Proxy' });

orchestrator.all('/:api_version/:module*', (req, res, next) => {
  switch (req.params.module) {
    case 'courses':
    case 'users':
    case 'auth':
    case 'admin':
    case 'dashboard':
    case 'reports':
    case 'payments':
    case 'emails':
    case 'sms':
    case 'feedback':
    case 'scheduling':
    case 'orders':
    case 'authentication':
    case 'learner':
    default:
      return next();
  }
  // return routeGuards[req.params.module](req, res, next);
  // return permittedRoles([])(req, res, next);
});

orchestrator.all(
  '/:api_version/:module*',
  tracedAsyncHandler(function redirect(req, res) {
    return connector.proxy(serviceHosts[req.params.module], req, res);
  }),
);

export default orchestrator;
