import { Router } from "express";

import {
    getAllPlayers,
    getPlayerById,
    getPlayerStats,
} from "../controllers/player";

const playerRouter = Router();

playerRouter.get("/", getAllPlayers);
playerRouter.get("/:id", getPlayerById);
playerRouter.get('/:id/stats', getPlayerStats);


export default playerRouter;