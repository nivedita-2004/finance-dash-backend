const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const validateRequest = require("../middleware/validateMiddleware");
const { registerValidator, loginValidator } = require("../validators/authValidator");

router.post("/register", registerValidator, validateRequest, authController.register);
router.post("/login", loginValidator, validateRequest, authController.login);

module.exports = router;