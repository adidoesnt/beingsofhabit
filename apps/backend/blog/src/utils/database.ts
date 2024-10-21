import { connect } from "mongoose";

const connectToDatabase = async () => {
  const { MONGODB_URI = "DUMMY-URL", MONGODB_DB_NAME = "DUMMY-DB-NAME" } =
    process.env;

  console.log("Connecting to database...");

  try {
    await connect(`${MONGODB_URI}/${MONGODB_DB_NAME}`);
    console.log("🌱 Connected to database");
  } catch (error) {
    console.error("💀 Failed to connect to database:", error);
    throw error;
  }
};

export const database = {
  connect: connectToDatabase,
};
