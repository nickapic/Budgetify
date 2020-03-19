const mongoose = require("mongoose");
const validator = require("validator");

const TransactionSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      trim: true,
      required: [true, "Please add some description"],
      validate: [
        validator.isAlphanumeric,
        "Please add description without special symbols using only Alphanumeric letters"
      ]
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
      enum: ["General", "Grocerries", "Restaurants", "Luxury", "Coffee"],
      default: "General"
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

module.exports = mongoose.model("Transaction", TransactionSchema);
