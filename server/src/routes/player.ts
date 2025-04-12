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

playerRouter.get("/", getAllPlayers);
playerRouter.get("/:id", getPlayerById);
playerRouter.get('/:id/stats', getPlayerStats);

playerRouter.post("/", createPlayer);
playerRouter.patch("/:id", updatePlayer);
playerRouter.delete("/:id", deletePlayer);


export default playerRouter;