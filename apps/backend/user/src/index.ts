import express from "express";
import { connectToDatabase } from "@/packages/common/shop/database";

const { PORT = 3001 } = process.env;

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
    console.log(`🚀 User service running on port ${PORT}`);
  });
})();
