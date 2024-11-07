import express from "express";
import { connectToDatabase } from "@/packages/common/shop/database";

const { PORT = 3003 } = process.env;

const app = express();

app.get("/", (_request, response) => {
  response.json({
    status: 200,
    message: "OK",
  });
});

(async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`🚀 Purchase service running on port ${PORT}`);
  });
})();
