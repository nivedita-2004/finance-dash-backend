const dashboardQuery = require("../queries/dashboardQuery");

async function getSummary(req, res, next) {
  try {
    const totals = await dashboardQuery.getTotals();
    const categoryTotals = await dashboardQuery.getCategoryWiseTotals();
    const recentActivity = await dashboardQuery.getRecentActivity(5);
    const monthlyTrends = await dashboardQuery.getMonthlyTrends();

    res.json({
      success: true,
      data: {
        totals,
        categoryTotals,
        recentActivity,
        monthlyTrends
      }
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getSummary
};