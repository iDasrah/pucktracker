import { Router, Request, Response } from "express";
import { updateTodayGamesPlayersStats } from "../services/cron";
import dotenv from "dotenv";
dotenv.config();

const cronRouter = Router();

cronRouter.post("/update", async (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || authHeader !== `Bearer ${process.env.API_CRON_SECRET}`) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }

    try {
        console.log("[CRON] Starting daily update...");
        await updateTodayGamesPlayersStats();
        console.log("[CRON] Update completed");
        res.status(200).json({ message: "Update completed!" });
    } catch (error) {
        console.error("[CRON] Update failed:", error);
        res.status(500).json({ error: "Failed to update data" });
    }
});

export default cronRouter;