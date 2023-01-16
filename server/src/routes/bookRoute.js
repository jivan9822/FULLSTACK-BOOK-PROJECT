const router = require('express').Router();
const book = require('../controllers/bookController');

router.route('/').post(book.AddBook);

module.exports = router;
