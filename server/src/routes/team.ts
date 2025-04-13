import { Router } from "express";

import {
    getAllTeams,
    getTeamById,
    getTeamPlayers,
} from "../controllers/team";

const teamRouter = Router();

teamRouter.get("/", getAllTeams);
teamRouter.get("/:id", getTeamById);
teamRouter.get('/:id/players', getTeamPlayers);

export default teamRouter;