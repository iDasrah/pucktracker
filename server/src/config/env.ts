import dotenv from "dotenv";

dotenv.config();

const env = {
  PORT: process.env.PORT || 8080,
  NODE_ENV: process.env.NODE_ENV || "development",
  API_HOST: process.env.API_HOST || "localhost",
  API_PORT: process.env.API_PORT || 8080,
  API_ROOT: process.env.API_ROOT || "/api",
  API_VERSION: process.env.API_VERSION || "v1",
};

export default env;