import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import router from "../routes/index.js";
import authRoutes from "../routes/auth.cjs";

dotenv.config();

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is not set in the environment');
}

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api", router);
app.use("/api/auth", authRoutes);

// Error middleware - must be last, before listen
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message || "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});