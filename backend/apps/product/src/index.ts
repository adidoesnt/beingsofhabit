import express from "express";

const { PORT = 3002 } = process.env;

const app = express();

app.get("/", (_request, response) => {
  response.json({
    status: 200,
    message: "OK",
  });
});

(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Product service running on port ${PORT}`);
  });
})();
