
import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../models/index.cjs";

const { Task, User } = db;
const router = Router();

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.slice(7)
    : null;

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

function requireAdmin(req, res, next) {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Admin access required" });
  }

  next();
}

router.get("/", (req, res) => {
  res.send("API is working!");
});

// Register
router.post("/auth/register", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password are required"
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        error: "Password must be at least 8 characters"
      });
    }

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(409).json({ error: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: name || null,
      email,
      password: hashedPassword,
      role: "member"
    });

    return res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    });
  } catch (error) {
    next(error);
  }
});

// Login
router.post("/auth/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password are required"
      });
    }

    const user = await User.findOne({ where: { email } });

    if (!user || !user.password ||
        !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    return res.status(200).json({
      message: "Login successful",
      token
    });
  } catch (error) {
    next(error);
  }
});

// GET all tasks, including their associated users
router.get("/tasks", async (req, res, next) => {
  try {
    const tasks = await Task.findAll({
      include: [{
        model: User,
        attributes: ["id", "name", "email", "role"]
      }]
    });

    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
});

// GET one task
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

// GET all users, without password hashes
router.get("/users", async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "name", "email", "role", "createdAt", "updatedAt"]
    });

    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

// Create task
router.post("/tasks", async (req, res, next) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
});

// Update task
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

// Delete task: admin only
router.delete(
  "/tasks/:id",
  authenticateToken,
  requireAdmin,
  async (req, res, next) => {
    try {
      const task = await Task.findByPk(req.params.id);

      if (!task) {
        return res.status(404).json({ error: "Task not found" });
      }

      await task.destroy();

      return res.status(200).json({
        message: "Task deleted"
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;