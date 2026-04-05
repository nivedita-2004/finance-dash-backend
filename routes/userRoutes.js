const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");
const validateRequest = require("../middleware/validateMiddleware");
const { updateUserValidator } = require("../validators/userValidator");

router.get("/", protect, allowRoles("admin"), userController.getUsers);
router.get("/:id", protect, allowRoles("admin"), userController.getUser);
router.put("/:id", protect, allowRoles("admin"), updateUserValidator, validateRequest, userController.updateUser);

module.exports = router;