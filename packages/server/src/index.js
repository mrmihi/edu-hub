import fs from 'fs';
import crypto from 'crypto';
import express from 'express';
import expressHealth from 'express-health-middleware';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import polyglot from 'node-polyglot';
import context from 'express-http-context';
import stack from 'callsite';
import clusterize from '@sliit-foss/clusterizer';
import { moduleLogger } from '@sliit-foss/module-logger';
import { correlationId } from '@app/constants';
import { errorHandler, responseInterceptor } from '@app/middleware';
import { connect as connectDatabase } from '@app/mongoose';

const initialize = ({ service, routes, leadingMiddleware = [], cors: enableCors, translations, database, config }) => {
  const logger = moduleLogger('Server');
  // clusterize(
  //   () => {
      const app = express();

      app.use(helmet());
      app.use(compression());

      app.use(express.json({ limit: '10mb' }));
      app.use(express.urlencoded({ extended: true }));

      if (enableCors) {
        app.use(cors());
      }

      app.use(context.middleware);

      app.use((req, _res, next) => {
        context.set('correlationId', req.headers[correlationId] ?? crypto.randomBytes(16).toString('hex'));
        next();
      });

      if (translations) {
        app.use((req, res, next) => {
          const locale = req.headers['accept-language'] ?? 'en';
          res.polyglot = new polyglot({
            allowMissing: true,
            onMissingKey: (key) => key,
          });
          if (translations[locale]) res.polyglot.extend(translations[locale]);
          context.set('locale', locale) && context.set('translate', res.polyglot.t);
          next();
        });
      }

      if (database) {
        connectDatabase();
      }

      app.use('/system', expressHealth());

      if (!routes) {
        routes = express.Router();
        const root = stack()
          .find((site) => site.getFileName().endsWith('server.js'))
          ?.getFileName()
          ?.replace('/server.js', '')
          ?.replace('\\server.js', '');
        fs.readdirSync(`${root}/modules`)?.forEach((module) => {
          fs.readdirSync(`${root}/modules/${module}/api`)?.forEach((v) => {
            routes.use(`/${v}/${module}`, require(`${root}/modules/${module}/api/${v}/controller`).default);
          });
        });
      }

      app.use(`/api`, ...leadingMiddleware, routes);

      app.use(responseInterceptor);

      app.use(errorHandler);

      const HOST = config.HOST ?? '0.0.0.0';

      app.listen(config.PORT, HOST, () => {
        logger.info(`${service} listening on ${HOST}:${config.PORT}`);
      });
    // },
    // { logger, workers: 1 },
  // );
};

export default initialize;
