import express from "express";
import dotenv from "dotenv";
import router from "./routes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});