const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    console.log("MongoDb is on bois");
  } catch (err) {
    console.log(err.message, err.stack);
    //Exit the process with Failure
    process.exit(1);
  }
};

module.exports = connectDB;
