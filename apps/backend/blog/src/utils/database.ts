import { connect, ConnectOptions, mongo } from "mongoose";
import { logger } from "./logger";
import path from "path";
import fs from "fs";

const { MONGODB_URI = "DUMMY-URL", MONGODB_DB_NAME = "DUMMY-DB-NAME", NODE_ENV = "PROD" } =
    process.env;
const isDevEnv = NODE_ENV === "DEV";

const getGlobalBundleFilePath = () => {
  if(isDevEnv) return;

  const globalBundleFilePath = path.resolve(__dirname, "../../global-bundle.pem");

  logger.debug("🔑 Loading global bundle file...", {
    globalBundleFilePath,
  });

  if (!fs.existsSync(globalBundleFilePath) && isDevEnv) {
    throw new Error("Global bundle file not found");
  }

  logger.debug("🔑 Global bundle file loaded", { globalBundleFilePath });

  return globalBundleFilePath;
}

const connectToDatabase = async () => {
  const globalBundleFilePath = getGlobalBundleFilePath();

  const options: ConnectOptions = {
    dbName: MONGODB_DB_NAME
  };

  const optionsWithTls = { 
    ...options, 
    tls: true,
    tlsCAFile: globalBundleFilePath
  }

  try {
    if (isDevEnv) {
      logger.debug("Connecting to database...", { options });
      await connect(MONGODB_URI, options);
    } else {
      logger.debug("Connecting to database...", { options: optionsWithTls });
      await connect(MONGODB_URI, optionsWithTls);
    }
    logger.info("🌱 Connected to database");
  } catch (error) {
    logger.error("💀 Failed to connect to database:", error as Error);
    throw error;
  }
};

export const database = {
  connect: connectToDatabase,
};
