import { connect } from "mongoose";
import { logger } from "./logger";

const connectToDatabase = async () => {
  const { MONGODB_URI = "DUMMY-URL", MONGODB_DB_NAME = "DUMMY-DB-NAME" } =
    process.env;

  logger.info("Connecting to database...");

  try {
    await connect(`${MONGODB_URI}/${MONGODB_DB_NAME}`);
    logger.info("🌱 Connected to database");
  } catch (error) {
    logger.error("💀 Failed to connect to database:", error as Error);
    throw error;
  }
};

export const database = {
  connect: connectToDatabase,
};
