const jwt = require("jsonwebtoken");
const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { promisify } = require("util");
const sendEmail = require("../utils/email");

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};
exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm
  });
  const token = signToken(newUser._id);

  res.status(201).json({
    success: true,
    token,
    data: {
      user: newUser
    }
  });
});

//Login Method
//Basically we check for negatives and send the possitive here
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  //1) Check if the email and password exist
  if (!email || !password) {
    next(new AppError("Please provide email and password", 400));
  }
  //2)Check if user exists && password is correct
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }
  //3) If everything is okay,send token to client
  const token = signToken(user._id);
  res.status(200).json({
    status: true,
    token
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  //1) Get the Token and check if it exists
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(
      new AppError("You are not logged in ! Log in to gain access", 401)
    );
  }
  //2) Verification of the token(If manipulated)

  //To turn this into a promise we use promisify
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  // console.log(decoded); For testing

  //3) If succesfull Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError("The user belonging to the Token does not exist", 401)
    );
  }
  //4) Check if user changed passwords after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError(
        "User rexently changed the password please log in again.",
        401
      )
    );
  }

  //5) Only if no problems exist we call next and grant the person access to the protected route
  req.user = currentUser;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    //Roles is an array so we only provide access to the person whose role is inside this array
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(
          "You do not have permission to access this restiricted route",
          403
        )
      );
    }
    next();
  };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  //TODO 1) Get user based on posted email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError("There is no user with that email address.", 404));
  }
  //TODO 2)Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  //This will basically disable the validation before saving the object
  await user.save({ validateBeforeSave: false });
  //TODO 3)Send it to user's email
  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/resetPassword/${resetToken}}`;

  const message = `Submit a new password and confirm it to reset your password.To do the following steps g to the link ${resetURL}.If you didnt forget your password please ignore this email.`;
  try {
    await sendEmail({
      email: user.email,
      subject: "Your password reset token(Valid for only 10 min)"
    });
    res.status(200).json({
      status: true,
      message: "token has been sent"
    });
    next();
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(
      new AppError("There was an error sending the email please try again", 500)
    );
  }
});
exports.resetPassword = (req, res, next) => {};
