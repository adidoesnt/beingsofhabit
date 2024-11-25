import { Sequelize, Options } from "sequelize";

const {
  NODE_ENV = "PROD",
  DB_HOST = "localhost",
  DB_PORT = 5432,
  DB_NAME = "boh",
  DB_USER = "postgres",
  DB_PASSWORD = "postgres",
} = process.env;

const isDevEnv = NODE_ENV === "DEV";

const devConfig: Options = {
  dialect: "postgres",
  host: DB_HOST,
  port: Number(DB_PORT),
  database: DB_NAME,
  username: DB_USER,
  password: DB_PASSWORD,
  logging: console.log
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

export const database = new Sequelize(config);
