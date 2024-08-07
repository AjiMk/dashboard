import dotenv from "dotenv";
dotenv.config();

interface Config {
  port: number;
  dbURI: string;
}

const config: Config = {
  port: parseInt(process.env.PORT as string, 10),
  dbURI: process.env.DB_URI as string,
};

export default config;
