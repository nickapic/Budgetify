const mongoose = require("mongoose");

const ProfilSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  currency: {
    type: String,
    enum: ["$", "€", "₹"]
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model("profile", ProfilSchema);
