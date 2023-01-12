const { CatchAsync } = require('../errors/CatchAsync');
const { promisify } = require('util');
const User = require('../models/User');
const AppError = require('../errors/AppError');
const jwt = require('jsonwebtoken');

exports.authenticate = CatchAsync(async (req, res, next) => {
  console.log(req.headers);

  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return next(
      new AppError(
        'This email is not registered with us. Please register to get access!',
        400
      )
    );
  }
  if (!(await user.comparePass(password, user.password))) {
    return next(new AppError('Incorrect password! Please try again!', 400));
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SEC_STRING);
  req.token = token;
  user.password = undefined;
  req.user = user;
  console.log(user);
  next();
});

exports.protect = CatchAsync(async (req, res, next) => {
  let token;
  if (req.headers.authorization) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  console.log(token);
  if (!token) {
    return next(new AppError('You are not logged in! Please login...', 400));
  }

  const decode = await promisify(jwt.verify)(token, process.env.JWT_SEC_STRING);
  const user = await User.findById(decode.id);
  if (!user) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401
      )
    );
  }

  req.user = user;
  next();
});

exports.isLoggedIn = CatchAsync(async (req, res, next) => {
  console.log(req.body);
  if (req.cookies.jwt) {
    let token = req.cookies.jwt;

    if (!token) {
      return next(new AppError('You are not logged in! Please login...', 400));
    }

    const decode = await promisify(jwt.verify)(
      token,
      process.env.JWT_SEC_STRING
    );
    const user = await User.findById(decode.id);
    if (!user) {
      return next(
        new AppError(
          'The user belonging to this token does no longer exist.',
          401
        )
      );
    }

    return res.status(200).json({
      status: true,
      message: 'success',
      data: {
        user,
      },
    });
  }
  next(new AppError('No user found!', 400));
});
