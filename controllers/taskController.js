import db from "../models/index.cjs";

const { Task, User } = db;

export async function getAllTasks(req, res, next) {
  try {
    const tasks = await Task.findAll({ include: User });
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
}

export async function getTaskById(req, res, next) {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
}

export async function getAllUsers(req, res, next) {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
}

export async function createTask(req, res, next) {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
}

export async function updateTask(req, res, next) {
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
}

export async function deleteTask(req, res, next) {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    await task.destroy();
    res.status(200).json({ message: "Task deleted", task });
  } catch (error) {
    next(error);
  }
}