const bcrypt = require("bcrypt");
const {
  USERNAME_1,
  PASSWORD_1,
  USERNAME_2,
  PASSWORD_2,
  SALT_ROUNDS = 10,
} = process.env;

module.exports = {
  async up(db, _client) {
    if (!USERNAME_1 || !PASSWORD_1 || !USERNAME_2 || !PASSWORD_2) {
      throw new Error("💀 Missing environment variables");
    }

    await db.collection("users").insertOne({
      username: USERNAME_1,
      passwordHash: await bcrypt.hash(PASSWORD_1, SALT_ROUNDS),
    });

    await db.collection("users").insertOne({
      username: USERNAME_2,
      passwordHash: await bcrypt.hash(PASSWORD_2, SALT_ROUNDS),
    });
  },

  async down(db, _client) {
    await db.collection("users").deleteMany({});
  },
};
