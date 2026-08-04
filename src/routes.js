import express from "express";
import tasks from "./tasks.js";
import { fetchSampleUsers } from "./api.js";

const router = express.Router();

router.get("/tasks", (req, res) => {
  res.json(tasks);
});

router.get("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);

  const task = tasks.find(t => t.id === id);

  if (!task) {
    return res.status(404).json({
      error: "Task not found"
    });
  }

  res.json(task);
});

router.get("/users", async (req, res) => {
  try {
    const users = await fetchSampleUsers();

    const simplifiedUsers = users.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email
    }));

    res.json(simplifiedUsers);
  } catch (err) {
    res.status(500).json({
      error: "Unable to fetch users"
    });
  }
});

export default router;