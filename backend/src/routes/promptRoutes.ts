import { Router } from 'express';
import { generate, refine } from '../controllers/promptController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.post('/generate', generate);
router.post('/refine', refine);

export default router;
