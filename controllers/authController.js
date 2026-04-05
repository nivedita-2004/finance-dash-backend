const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authQuery = require("../queries/authQuery");
require("dotenv").config();

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
      status: user.status
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
}

async function register(req, res, next) {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await authQuery.getUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await authQuery.createUser(name, email, hashedPassword, role || "viewer");
    const user = await authQuery.getUserById(userId);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user
    });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const user = await authQuery.getUserByEmail(email);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    if (user.status !== "active") {
      return res.status(403).json({
        success: false,
        message: "User account is inactive"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    const token = generateToken(user);

    res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status
      }
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  register,
  login
};