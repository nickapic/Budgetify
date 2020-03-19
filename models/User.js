const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please add a name"]
    },
    email: {
      type: String,
      required: [true, "Please add the email"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"]
    },
    photo: {
      type: String,
      trim: true
    },
    password: {
      type: String,
      required: [true, "Please add the password"],
      select: false,
      minlength: 8
    },
    role: {
      type: String,
      enum: ["user", "admin", "moderators"],
      default: "user"
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please confirm the password"],
      validate: {
        //This is only gonna work on Create and Save !!!!!!! Be carefull Mr Developer 🏄🏻‍♂️
        validator: function(el) {
          return el === this.password;
        },
        message: "Passwords are not the same"
      }
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
      type: Boolean,
      default: true,
      select: false
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre("save", function(next) {
  if (!this.isModified("password" || this.isNew)) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});
//Instance Method Its available on all documents

userSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    console.log(this.passwordChangedAt, JWTTimestamp);
    //So if its changed and the token is from a timestamp before the changed timestamp it will give true
    return JWTTimestamp < changedTimestamp;
  }
  //False means not changed Which means
  return false;
};
userSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
