const { CatchAsync } = require('../errors/CatchAsync');
const User = require('../models/User');
const AppError = require('../errors/AppError');

exports.protect = CatchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return next(
      new AppError(
        'This email is not registered with us. Please register to get access!',
        404
      )
    );
  }
  console.log(user);
  next();
});
