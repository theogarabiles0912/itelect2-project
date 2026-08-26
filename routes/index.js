import { Router } from "express";
import db from "../models/index.cjs";

const { Task, User } = db;

const router = Router();

router.get("/", (req, res) => {
  res.send("API is working!");
});

// GET all tasks
router.get("/tasks", async (req, res, next) => {
  try {
    const tasks = await Task.findAll({
      include: User
    });

    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
});

// GET single task
router.get("/tasks/:id", async (req, res, next) => {
  try {
    const task = await Task.findByPk(req.params.id);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
});

// GET all users
router.get("/users", async (req, res, next) => {
  try {
    const users = await User.findAll();

    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

// POST create task
router.post("/tasks", async (req, res, next) => {
  try {
    const task = await Task.create(req.body);

    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
});

// PUT update task
router.put("/tasks/:id", async (req, res, next) => {
  try {
    const task = await Task.findByPk(req.params.id);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    await task.update(req.body);

    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
});

// DELETE task
router.delete("/tasks/:id", async (req, res, next) => {
  try {
    const task = await Task.findByPk(req.params.id);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    await task.destroy();

    res.status(200).json({
      message: "Task deleted",
      task
    });
  } catch (error) {
    next(error);
  }
});

export default router;