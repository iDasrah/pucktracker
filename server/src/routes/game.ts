import { Router } from 'express';
import { getTodaysGames, getTodaysGamesBestPlayers, getGameBestPlayers } from '../controllers/game';

const router = Router();

router.get('/today', getTodaysGames);
router.get('/today/bestplayers', getTodaysGamesBestPlayers);
router.get('/:id/bestplayers', getGameBestPlayers);

export default router;
