const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  text: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 20
  },
  amount: {
    type: Number,
    required: true,
    max: 99999,
    min: -99999
  },
  category: {
    type: String,
    required: true,
    enum: [
      "General",
      "Travel",
      "Shopping",
      "Groceries",
      "Restaurants",
      "Technology"
    ],
    default: "General"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Transaction = mongoose.model("transaction", TransactionSchema);
