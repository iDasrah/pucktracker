import express from "express";
import cors from "cors";
import env from "./config/env";
import playerRouter from "./routes/player";
import teamRouter from "./routes/team";
import gameRouter from "./routes/game";
import cronRouter from "./routes/cron";
import { Request, Response } from "express";

export const app = express();
const { PORT, API_ROOT, API_VERSION } = env;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(`${API_ROOT}/${API_VERSION}/players`,playerRouter);
app.use(`${API_ROOT}/${API_VERSION}/teams`, teamRouter);
app.use(`${API_ROOT}/${API_VERSION}/games`, gameRouter);
app.use(`${API_ROOT}/${API_VERSION}/cron`, cronRouter);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to the PuckTracker's API",
    version: API_VERSION,
    api_root: API_ROOT,
    routes: {
        players: `${API_ROOT}/${API_VERSION}/players`,
        teams: `${API_ROOT}/${API_VERSION}/teams`,
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on ${env.API_HOST}:${PORT}${API_ROOT}/${API_VERSION}`);
});