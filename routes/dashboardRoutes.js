const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");
const protect = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");

router.get("/summary", protect, allowRoles("viewer", "analyst", "admin"), dashboardController.getSummary);

module.exports = router;