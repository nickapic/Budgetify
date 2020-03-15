const Transaction = require("../models/Transaction");
const catchAsync = require("../utils/catchAsync");
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

//Get All Transactions -route: api/v1/transaction
exports.addTransactions = catchAsync(async (req, res, next) => {
  const { text, amount } = req.body;

  const transaction = await Transaction.create(req.body);
  return res.status(201).json({
    success: true,
    data: transaction
  });
});

//Get All Transactions -route: api/v1/transaction/:id
exports.deleteTransactions = catchAsync(async (req, res, next) => {
  const transaction = await Transaction.findById(req.params.id);
  if (!transaction) {
    return res.status(404).json({
      success: false,
      error: "Not Found"
    });
  }
  await transaction.remove();
  return res.status(200).json({
    success: true,
    data: {}
  });
});
