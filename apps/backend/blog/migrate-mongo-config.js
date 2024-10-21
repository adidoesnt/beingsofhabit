const { MONGODB_URI = "DUMMY-URL", MONGODB_DB_NAME = "DUMMY-DB-NAME" } =
  process.env;

const config = {
  mongodb: {
    url: MONGODB_URI,
    databaseName: MONGODB_DB_NAME,

    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  migrationsDir: "migrations",
  changelogCollectionName: "changelog",
  migrationFileExtension: ".js",
  useFileHash: false,
  moduleSystem: "commonjs",
};

module.exports = config;
