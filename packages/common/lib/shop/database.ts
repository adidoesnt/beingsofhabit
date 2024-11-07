import { Sequelize, type Dialect, type Options } from "sequelize";

const {
    DB_HOST = "localhost",
    DB_PORT = "5432",
    DB_USER = "postgres",
    DB_PASSWORD = "postgres",
    DB_NAME = "shop",
} = process.env;

const config: Options = {
    dialect: "postgres" as Dialect,
    host: DB_HOST,
    port: Number(DB_PORT),
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    // TODO: add ssl
    // TODO: add logging
};

const database = new Sequelize(config);

const connectToDatabase = async () => {
    try {
        await database.authenticate();
        console.log("🐘 Connected to database");
    } catch (error) {
        console.error("💀 Failed to connect to database:", error);
        throw error;
    }
};

export { database, connectToDatabase };
