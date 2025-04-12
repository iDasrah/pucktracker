import { Router } from "express";

import {
    createPlayer,
    deletePlayer,
    getAllPlayers,
    getPlayerById,
    getPlayerStats,
    updatePlayer,
} from "../controllers/player";

const playerRouter = Router();

playerRouter.get("/players", getAllPlayers);
playerRouter.get("/players/:id", getPlayerById);
playerRouter.get('/players/:id/stats', getPlayerStats);

playerRouter.post("/players", createPlayer);
playerRouter.patch("/players/:id", updatePlayer);
playerRouter.delete("/players/:id", deletePlayer);


export default playerRouter;