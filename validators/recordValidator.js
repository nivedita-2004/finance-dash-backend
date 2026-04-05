const { body } = require("express-validator");

const createRecordValidator = [
  body("amount").isFloat({ gt: 0 }).withMessage("Amount must be greater than 0"),
  body("type").isIn(["income", "expense"]).withMessage("Type must be income or expense"),
  body("category").trim().notEmpty().withMessage("Category is required"),
  body("record_date").isDate().withMessage("Valid record_date is required"),
  body("notes").optional().isString().withMessage("Notes must be text")
];

const updateRecordValidator = [
  body("amount").optional().isFloat({ gt: 0 }).withMessage("Amount must be greater than 0"),
  body("type").optional().isIn(["income", "expense"]).withMessage("Type must be income or expense"),
  body("category").optional().trim().notEmpty().withMessage("Category cannot be empty"),
  body("record_date").optional().isDate().withMessage("Valid record_date is required"),
  body("notes").optional().isString().withMessage("Notes must be text")
];

module.exports = {
  createRecordValidator,
  updateRecordValidator
};