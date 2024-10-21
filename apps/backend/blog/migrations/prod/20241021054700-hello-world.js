module.exports = {
  async up(_db, _client) {
    console.log("Hello! We have migrated up.");
  },

  async down(_db, _client) {
    console.log("Goodbye! We have migrated down.");
  },
};