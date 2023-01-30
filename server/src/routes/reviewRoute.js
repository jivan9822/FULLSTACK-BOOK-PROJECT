const router = require('express').Router();
const review = require('../controllers/reviewController');
const { protect } = require('../middleware/auth');

router
  .route('/id')
  .post(protect, review.getReview)
  .patch(protect, review.updateReview)
  .delete(protect, review.deleteReview);

router.post('/', protect, review.addReview);

// router.post('/id', protect, review.getReview);

module.exports = router;
