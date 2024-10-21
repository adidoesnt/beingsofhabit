const dotenv = require("dotenv");
dotenv.config();

const { MONGODB_URI, MONGODB_DB_NAME, NODE_ENV = "DEV" } = process.env;

if (!MONGODB_URI || !MONGODB_DB_NAME) {
  throw new Error("💀 Missing environment variables");
}

let migrationsDir = "migrations/";
if (NODE_ENV === "DEV") {
  migrationsDir += "dev";
} else {
  migrationsDir += "prod";
}

const config = {
  mongodb: {
    url: MONGODB_URI,
    databaseName: MONGODB_DB_NAME,
  },
  migrationsDir,
  changelogCollectionName: "changelog",
  migrationFileExtension: ".js",
  useFileHash: false,
  moduleSystem: "commonjs",
};

module.exports = config;
