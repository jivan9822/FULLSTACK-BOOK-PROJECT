const router = require('express').Router();
const review = require('../controllers/reviewController');
const { protect } = require('../middleware/auth');

router.post('/', protect, review.addReview);
router.post('/id', protect, review.getReview);

module.exports = router;
