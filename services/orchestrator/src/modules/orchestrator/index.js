import express from 'express';
import routes from './api/controller';

const router = express.Router();

router.use(`/`, routes);

export default router;
