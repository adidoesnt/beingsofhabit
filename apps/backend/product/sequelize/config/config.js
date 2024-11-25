const {
  DB_HOST = "localhost",
  DB_PORT = 5432,
  DB_NAME = "boh",
  DB_USER = "boh",
  DB_PASSWORD = "boh",
  DB_SCHEMA = "boh",
} = process.env;

const exports = {
  "DEV": {
    "username": DB_USER,
    "password": DB_PASSWORD,
    "database": DB_NAME,
    "host": DB_HOST,
    "dialect": "postgres",
    "port": DB_PORT,
    "schema": DB_SCHEMA,
  },
  "PROD": {
    "username": DB_USER,
    "password": DB_PASSWORD,
    "database": DB_NAME,
    "host": DB_HOST,
    "dialect": "postgres",
    "port": DB_PORT,
    "schema": DB_SCHEMA,
  }
}

export default exports;
