const multer = require('multer');
const sharp = require('sharp');

const multerStorage = multer.memoryStorage();
let url;
const multerFilter = (req, file, cb) => {
  url = req.originalUrl;
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
  if (url == '/book') {
    url = 'BookCover';
  } else {
    url = 'User';
  }
  console.log(url);
  if (!req.file) {
    req.body.photo = `http://localhost:4000/default.jpg`;
    return next();
  }
  req.file.filename = `user-${
    req.user ? req.user._id : req.file.originalname
  }.jpeg`;
  sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`src/images/${url}/${req.file.filename}`);

  req.body.photo = `http://localhost:4000/${url}/${req.file.filename}`;

  next();
};
