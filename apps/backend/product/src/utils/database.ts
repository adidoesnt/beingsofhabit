import { Sequelize } from "sequelize-typescript";
import { Options } from "sequelize";
import { logger } from "./logger";
import * as models from "../model";

const {
  NODE_ENV = "PROD",
  DB_HOST = "localhost",
  DB_PORT = 5432,
  DB_NAME = "boh",
  DB_USER = "boh",
  DB_PASSWORD = "boh",
  DB_SCHEMA = "boh",
} = process.env;

const isDevEnv = NODE_ENV === "DEV";

const devConfig: Options = {
  dialect: "postgres",
  host: DB_HOST,
  port: Number(DB_PORT),
  database: DB_NAME,
  username: DB_USER,
  password: DB_PASSWORD,
  schema: DB_SCHEMA,
  logging: console.log,
};

const prodConfig: Options = {
  ...devConfig,
  ssl: true,
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
};

const config = isDevEnv ? devConfig : prodConfig;

export const sequelize = new Sequelize(config);

export const database = {
  init: async () => {
    try {
      logger.debug("Connecting to database...");
      sequelize.addModels(Object.values(models));
      await sequelize.authenticate();
      logger.info("🐘 Connected to database");
    } catch (error) {
      logger.error("💀 Failed to connect to database:", error as Error);
      throw error;
    }
  },
  close: async () => {
    try {
      await sequelize.close();
    } catch (error) {
      logger.error("💀 Failed to close database connection:", error as Error);
    }
  },
};