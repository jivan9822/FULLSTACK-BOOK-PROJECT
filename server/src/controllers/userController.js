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
