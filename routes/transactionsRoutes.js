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
  .get(protect, getTransactions)
  .post(protect, addTransactions);

router.route("/:id").delete(protect, deleteTransactions);

module.exports = router;
