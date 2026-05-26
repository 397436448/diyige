import { Router } from 'express';
import { getConfig, saveConfig, deleteConfig, testConnection } from '../controllers/configController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.get('/', authenticateToken, getConfig);
router.post('/', authenticateToken, saveConfig);
router.delete('/:id', authenticateToken, deleteConfig);
router.post('/test', authenticateToken, testConnection);

export default router;
