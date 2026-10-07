import { Router } from "express";
import verifyToken from "../middleware/verifyToken.cjs";
import requireRole from "../middleware/requireRole.cjs";
import {
  getAllTasks,
  getTaskById,
  getAllUsers,
  createTask,
  updateTask,
  deleteTask
} from "../controllers/taskController.js";
import { register, login } from "../controllers/authController.js";

const router = Router();

router.get("/", (req, res) => {
  res.send("API is working!");
});

// Tasks
router.get("/tasks", getAllTasks);
router.get("/tasks/:id", getTaskById);
router.post("/tasks", verifyToken, createTask);
router.put("/tasks/:id", verifyToken, updateTask);
router.delete("/tasks/:id", verifyToken, requireRole("admin"), deleteTask);

// Users
router.get("/users", getAllUsers);

// Auth
router.post("/auth/register", register);
router.post("/auth/login", login);

export default router;