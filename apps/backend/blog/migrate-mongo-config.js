const {
  MONGODB_URI = "mongodb://localhost:27017",
  MONGODB_DB_NAME = "blog",
  NODE_ENV = "DEV",
} = process.env;

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
