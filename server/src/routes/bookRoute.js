const router = require('express').Router();
const book = require('../controllers/bookController');
const { protect } = require('../middleware/auth');
const {
  uploadUserPhoto,
  resizeUserPhoto,
} = require('../middleware/fileUploads');

router.route('/').post(protect, uploadUserPhoto, resizeUserPhoto, book.AddBook);

module.exports = router;
