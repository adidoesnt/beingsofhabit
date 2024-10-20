import express from "express";

const { PORT = 3003 } = process.env;

const app = express();

app.get("/", (_request, response) => {
  response.json({
    status: 200,
    message: "OK",
  });
});

(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Purchase service running on port ${PORT}`);
  });
})();
