const Transaction = require("../models/Transaction");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

//Catches

//Get All Transactions -route: api/v1/transaction
exports.getTransactions = catchAsync(async (req, res, next) => {
  const transactions = await Transaction.find();
  return res.status(200).json({
    success: true,
    count: transactions.length,
    data: transactions
  });
});

//Add Transactions -route: api/v1/transaction
exports.addTransactions = catchAsync(async (req, res, next) => {
  const { text, amount } = req.body;

  const transaction = await Transaction.create(req.body);
  return res.status(201).json({
    success: true,
    data: transaction
  });
});

//Delete Transaction -route: api/v1/transaction/:id
exports.deleteTransactions = catchAsync(async (req, res, next) => {
  const transaction = await Transaction.findById(req.params.id);
  if (!transaction) {
    return next(new AppError("No transaction found with this Id", 404));
  }
  await transaction.remove();
  return res.status(200).json({
    success: true,
    data: {}
  });
});
