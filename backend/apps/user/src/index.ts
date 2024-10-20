import express from "express";

const { PORT = 3001 } = process.env;

const app = express();

app.get("/", (_request, response) => {
  response.json({
    status: 200,
    message: "OK",
  });
});

(() => {
  app.listen(PORT, () => {
    console.log(`🚀 User service running on port ${PORT}`);
  });
})();
