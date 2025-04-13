import express from "express";
import cors from "cors";
import env from "./config/env";
import playerRouter from "./routes/player";
import teamRouter from "./routes/team";

export const app = express();
const { PORT, API_ROOT, API_VERSION } = env;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(`${API_ROOT}/${API_VERSION}/players`,playerRouter);
app.use(`${API_ROOT}/${API_VERSION}/teams`, teamRouter);

app.get(`${API_ROOT}/${API_VERSION}`, (req, res) => {
  res.json({
    message: "Hello World",
  })
});

app.listen(PORT, () => {
  console.log(`Server is running on ${env.API_HOST}:${PORT}${API_ROOT}/${API_VERSION}`);
});