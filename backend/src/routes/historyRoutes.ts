import { Router } from 'express';
import { getHistory, deleteHistory, toggleFavorite } from '../controllers/historyController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.get('/', authenticateToken, getHistory);
router.delete('/:id', authenticateToken, deleteHistory);
router.post('/:id/favorite', authenticateToken, toggleFavorite);

export default router;
