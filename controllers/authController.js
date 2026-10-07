import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../models/index.cjs";

const { User } = db;

export async function register(req, res, next) {
  try {
    const { email, password, role } = req.body;

    if (!password || password.length < 8) {
      return res.status(400).json({ error: "Password must be at least 8 characters" });
    }

    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashed, role });

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    const invalid = () => res.status(401).json({ error: "Invalid email or password" });

    if (!user) return invalid();

    const match = await bcrypt.compare(password, user.password);
    if (!match) return invalid();

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
}