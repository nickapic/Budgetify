const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const user = await User.find();
  return res.status(200).json({
    success: true,
    count: user.length,
    data: user
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  //1)Create Error if user posts Password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "This is not the method of updating the password please use the other route ",
        400
      )
    );
  }
  const filteredBody = filterObj(req.body, "name", "email");
  //2) Update User document we cant use save because it will need all the validators to be checked adn we cant pass req.body because then the user can update some unauthorized stuff
  const updateUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: true,
    data: {
      user: updateUser
    }
  });
});

exports.getUser = (req, res) => {
  res.status(500).json({
    status: false,
    message: "This route is not yet defined!"
  });
};
exports.createUser = (req, res) => {
  res.status(500).json({
    status: false,
    message: "This route is not yet defined!"
  });
};
exports.updateUser = (req, res) => {
  res.status(500).json({
    status: false,
    message: "This route is not yet defined!"
  });
};
exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: false,
    message: "This route is not yet defined!"
  });
};
