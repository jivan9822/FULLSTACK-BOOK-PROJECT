const { CatchAsync } = require('../errors/CatchAsync');
const User = require('../models/User');

exports.userRegistration = CatchAsync(async (req, res, next) => {
  req.body.data.roll = 'user';
  const data = await User.create(req.body.data);
  res.status(201).json({
    status: true,
    message: 'User registration success!',
    data,
  });
});

exports.userLogin = CatchAsync(async (req, res, next) => {
  res.cookie('jwt', req.token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  });
  res.status(200).json({
    status: true,
    message: 'Login success!',
    data: {
      token: req.token,
      user: req.user,
    },
  });
});

exports.userLogOut = CatchAsync(async (req, res, next) => {
  res.cookie('jwt', null);
  res.status(200).json({
    status: true,
    message: 'Logout success!',
  });
});

exports.isValid = CatchAsync(async (req, res, next) => {
  res.status(200).json({
    status: true,
    message: 'success!',
    data: {
      user: req.user,
    },
  });
});

exports.userProfile = CatchAsync(async (req, res, next) => {
  res.status(200).json({
    status: true,
    message: 'success',
    data: {
      user: req.user,
    },
  });
});

exports.updateProfile = CatchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: req.body,
    },
    { new: true }
  );
  res.status(200).json({
    status: true,
    message: 'Update Success!',
    data: {
      user,
    },
  });
});

exports.getAllUsers = CatchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: true,
    message: 'success',
    users,
  });
});
