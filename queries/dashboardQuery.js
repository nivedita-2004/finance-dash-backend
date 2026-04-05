const db = require("../config/db");

async function getTotals() {
  const [rows] = await db.execute(`
    SELECT
      COALESCE(SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END), 0) AS total_income,
      COALESCE(SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END), 0) AS total_expenses,
      COALESCE(SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END), 0) -
      COALESCE(SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END), 0) AS net_balance
    FROM financial_records
  `);

  return rows[0];
}

async function getCategoryWiseTotals() {
  const [rows] = await db.execute(`
    SELECT category, type, COALESCE(SUM(amount), 0) AS total
    FROM financial_records
    GROUP BY category, type
    ORDER BY total DESC
  `);

  return rows;
}

async function getRecentActivity(limit = 5) {
  const [rows] = await db.execute(`
    SELECT id, amount, type, category, record_date, notes, created_by, created_at
    FROM financial_records
    ORDER BY created_at DESC
    LIMIT ?
  `, [Number(limit)]);

  return rows;
}

async function getMonthlyTrends() {
  const [rows] = await db.execute(`
    SELECT
      DATE_FORMAT(record_date, '%Y-%m') AS month,
      COALESCE(SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END), 0) AS income,
      COALESCE(SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END), 0) AS expense
    FROM financial_records
    GROUP BY DATE_FORMAT(record_date, '%Y-%m')
    ORDER BY month ASC
  `);

  return rows;
}

module.exports = {
  getTotals,
  getCategoryWiseTotals,
  getRecentActivity,
  getMonthlyTrends
};