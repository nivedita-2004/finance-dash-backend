const db = require("../config/db");

async function getAllUsers() {
  const [rows] = await db.execute(
    "SELECT id, name, email, role, status, created_at, updated_at FROM users ORDER BY id DESC"
  );
  return rows;
}

async function getUserById(id) {
  const [rows] = await db.execute(
    "SELECT id, name, email, role, status, created_at, updated_at FROM users WHERE id = ? LIMIT 1",
    [id]
  );
  return rows[0];
}

async function updateUser(id, fields) {
  const updates = [];
  const values = [];

  Object.keys(fields).forEach((key) => {
    updates.push(`${key} = ?`);
    values.push(fields[key]);
  });

  values.push(id);

  const [result] = await db.execute(
    `UPDATE users SET ${updates.join(", ")} WHERE id = ?`,
    values
  );

  return result.affectedRows;
}

module.exports = {
  getAllUsers,
  getUserById,
  updateUser
};