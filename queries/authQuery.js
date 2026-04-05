const db = require("../config/db");

async function createUser(name, email, password, role = "viewer") {
  const [result] = await db.execute(
    `INSERT INTO users (name, email, password, role, status)
     VALUES (?, ?, ?, ?, 'active')`,
    [name, email, password, role]
  );

  return result.insertId;
}

async function getUserByEmail(email) {
  const [rows] = await db.execute(
    "SELECT * FROM users WHERE email = ? LIMIT 1",
    [email]
  );
  return rows[0];
}

async function getUserById(id) {
  const [rows] = await db.execute(
    "SELECT id, name, email, role, status, created_at, updated_at FROM users WHERE id = ? LIMIT 1",
    [id]
  );
  return rows[0];
}

module.exports = {
  createUser,
  getUserByEmail,
  getUserById
};