import { Router } from "express";
import tasks from "../src/tasks.js";
import { validateTask, mergeTaskUpdate } from "../src/utils.js";
import { fetchSampleUsers } from "../src/api.js";

const router = Router();

// simple in-memory cache so we don't hit the external API on every request
let cachedUsers = null;

router.get("/", (req, res) => {
  res.send("API is working!");
});

// GET all tasks
router.get("/tasks", (req, res) => {
  res.status(200).json(tasks);
});

// GET single task
router.get("/tasks/:id", (req, res) => {
  const task = tasks.find((t) => t.id === Number(req.params.id));
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }
  res.status(200).json(task);
});

// GET users (cached)
router.get("/users", async (req, res, next) => {
  try {
    if (!cachedUsers) {
      cachedUsers = await fetchSampleUsers();
    }
    res.status(200).json(cachedUsers);
  } catch (error) {
    next(error);
  }
});

// POST create task
router.post("/tasks", (req, res) => {
  if (!validateTask(req.body)) {
    return res.status(400).json({ error: "Invalid task data" });
  }
  const newTask = { id: Date.now(), completed: false, ...req.body };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT update task
router.put("/tasks/:id", (req, res) => {
  const task = tasks.find((t) => t.id === Number(req.params.id));
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }
  const updatedTask = mergeTaskUpdate(task, req.body);
  const index = tasks.findIndex((t) => t.id === task.id);
  tasks[index] = updatedTask;
  res.status(200).json(updatedTask);
});

// DELETE task
router.delete("/tasks/:id", (req, res) => {
  const index = tasks.findIndex((t) => t.id === Number(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: "Task not found" });
  }
  const [deleted] = tasks.splice(index, 1);
  res.status(200).json({ message: "Task deleted", task: deleted });
});

export default router;