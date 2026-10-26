import { Router } from 'express';
import cityRoutes from './cityRoutes';
import stateRoutes from './stateRoutes';
import bookmarkRoutes from './bookmarkRoutes';
import syncRoutes from './syncRoutes';
import { getDBStatus } from '../config/db';

const router = Router();

// Health check endpoint
router.get('/health', (_req, res) => {
  const dbStatus = getDBStatus();
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    service: 'AI-Powered Indian City Discovery Platform API',
    version: '1.0.0',
    database: {
      status: dbStatus.isConnected ? 'connected' : 'offline_fallback_active',
      ...dbStatus,
    },
    scope: 'India Cities Exclusively (18+ Cities across all regions)',
  });
});

// Mount modular sub-routers
router.use('/cities', cityRoutes);
router.use('/states', stateRoutes);
router.use('/bookmarks', bookmarkRoutes);
router.use('/sync', syncRoutes);

export default router;
