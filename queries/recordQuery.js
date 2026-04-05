const db = require("../config/db");

async function createRecord(record) {
  const { amount, type, category, record_date, notes, created_by } = record;

  const [result] = await db.execute(
    `INSERT INTO financial_records (amount, type, category, record_date, notes, created_by)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [amount, type, category, record_date, notes || null, created_by]
  );

  return result.insertId;
}

async function getRecordById(id) {
  const [rows] = await db.execute(
    `SELECT * FROM financial_records WHERE id = ? LIMIT 1`,
    [id]
  );
  return rows[0];
}

async function getRecords(filters) {
  let sql = `SELECT * FROM financial_records WHERE 1=1`;
  const values = [];

  if (filters.type) {
    sql += ` AND type = ?`;
    values.push(filters.type);
  }

  if (filters.category) {
    sql += ` AND category = ?`;
    values.push(filters.category);
  }

  if (filters.startDate) {
    sql += ` AND record_date >= ?`;
    values.push(filters.startDate);
  }

  if (filters.endDate) {
    sql += ` AND record_date <= ?`;
    values.push(filters.endDate);
  }

  sql += ` ORDER BY record_date DESC, id DESC`;

  const [rows] = await db.execute(sql, values);
  return rows;
}

async function updateRecord(id, fields) {
  const updates = [];
  const values = [];

  Object.keys(fields).forEach((key) => {
    updates.push(`${key} = ?`);
    values.push(fields[key]);
  });

  values.push(id);

  const [result] = await db.execute(
    `UPDATE financial_records SET ${updates.join(", ")} WHERE id = ?`,
    values
  );

  return result.affectedRows;
}

async function deleteRecord(id) {
  const [result] = await db.execute(
    `DELETE FROM financial_records WHERE id = ?`,
    [id]
  );

  return result.affectedRows;
}

module.exports = {
  createRecord,
  getRecordById,
  getRecords,
  updateRecord,
  deleteRecord
};