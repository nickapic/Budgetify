const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Transaction = require("../../models/Transaction");
const auth = require("../../middleware/auth");

//@route    POST api/transaction
//@desc     Create a Transaction
//@access   Public (So anyone can access this )
router.post(
  "/",
  [
    auth,
    [
      check("text", "Text is required").isLength({ min: 2, max: 20 }),
      check("amount", "Amount should be a number").isFloat({
        min: -99999,
        max: 99999
      })
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newTransaction = new Transaction({
        text: req.body.text,
        amount: req.body.amount,
        user: req.user.id,
        category: req.body.category
      });
      const transaction = await newTransaction.save();
      return res.json(transaction);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server Error has Occured");
    }
  }
);

//@route GET api/transactions
//@desc Get all transacions for the current user
//@acess Private
router.get("/", [auth], async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id }).sort({
      date: -1
    });
    res.json(transactions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
// @route    DELETE api/posts/:id
// @desc     Delete a post
// @access   Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const transaction = await Transaction.findOne({ id: req.param.id });
    if (!transaction) {
      return res.status(404).json({ msg: "transaction not found" });
    }
    await transaction.remove();
    return res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
