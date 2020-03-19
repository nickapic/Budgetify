const express = require("express");
const router = express.Router();
const { protect, restrictTo } = require("./../controllers/authController");
const {
  getTransactions,
  addTransactions,
  deleteTransactions
} = require("../controllers/transactionController");

router
  .route("/")
  .get(getTransactions)
  .post(addTransactions);

router
  .route("/:id")
  .delete(protect, restrictTo("admin", "moderator"), deleteTransactions);

module.exports = router;
