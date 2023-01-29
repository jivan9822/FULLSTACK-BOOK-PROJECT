const router = require('express').Router();
const book = require('../controllers/bookController');
const { protect } = require('../middleware/auth');
const {
  uploadUserPhoto,
  resizeUserPhoto,
} = require('../middleware/fileUploads');

router
  .route('/')
  .post(protect, uploadUserPhoto, resizeUserPhoto, book.AddBook)
  .get(book.getAllBook)
  .patch(protect, uploadUserPhoto, resizeUserPhoto, book.updateBook);

router.post('/del', protect, book.deleteBook);

module.exports = router;
