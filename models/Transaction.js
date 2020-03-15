const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      trim: true,
      required: [true, "Please add some description"]
    },
    amount: {
      type: Number,
      required: [true, "Please add the amount spent or earned"]
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    category: {
      type: String,
      trim: true,
      default: "General"
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

module.exports = mongoose.model("Transaction", TransactionSchema);
