const { CatchAsync } = require('../errors/CatchAsync');
const User = require('../models/User');
const multer = require('multer');
const sharp = require('sharp');
const AppError = require('../errors/AppError');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single('photo');

exports.resizeUserPhoto = (req, res, next) => {
  if (!req.file) return next();
  req.file.filename = `user-${req.user._id}-${Date.now()}.jpeg`;

  sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);

  next();
};

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
