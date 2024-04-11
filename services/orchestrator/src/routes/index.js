import express from 'express';
import orchestratorRoutes from '../modules/orchestrator';

const router = express.Router();

router.use(orchestratorRoutes);

export default router;
