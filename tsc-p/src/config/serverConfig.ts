import dotenv from "dotenv";

dotenv.config();



export const EnvVars = {
  DB_URL: process.env.DB_URL,
  PORT: process.env.PORT,
  SECRET_KEY:process.env.SECRET_KEY
};
