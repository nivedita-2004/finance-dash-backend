const express = require("express");
const router = express.Router();
const recordController = require("../controllers/recordController");
const protect = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");
const validateRequest = require("../middleware/validateMiddleware");
const { createRecordValidator, updateRecordValidator } = require("../validators/recordValidator");

router.get("/", protect, allowRoles("viewer", "analyst", "admin"), recordController.getRecords);
router.get("/:id", protect, allowRoles("viewer", "analyst", "admin"), recordController.getRecord);

router.post(
  "/",
  protect,
  allowRoles("admin"),
  createRecordValidator,
  validateRequest,
  recordController.createRecord
);

router.put(
  "/:id",
  protect,
  allowRoles("admin"),
  updateRecordValidator,
  validateRequest,
  recordController.updateRecord
);

router.delete("/:id", protect, allowRoles("admin"), recordController.deleteRecord);

module.exports = router;