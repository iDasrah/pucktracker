import { Router } from 'express';
import { getTodaysGames, getTodaysGamesBestPlayers } from '../controllers/game';

const router = Router();

router.get('/today', getTodaysGames);
router.get('/today/bestplayers', getTodaysGamesBestPlayers);

export default router;
