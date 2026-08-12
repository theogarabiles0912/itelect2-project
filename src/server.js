import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import router from "../routes/index.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Error middleware - must be last
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message || "Internal server error" });
});