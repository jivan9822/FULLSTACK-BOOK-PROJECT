const AppError = require('../errors/AppError');
const { CatchAsync } = require('../errors/CatchAsync');
const Book = require('../models/Book');
const Review = require('../models/Review');

exports.addReview = CatchAsync(async (req, res, next) => {
  req.body.reviewedAt = Date.now();
  req.body.user = req.user._id;
  req.body.userName = `${req.user.fname} ${req.user.lname}`;
  const review = await Review.create(req.body);
  res.status(201).json({
    status: true,
    message: 'Review created successfully!',
    data: {
      review,
    },
  });
});

exports.getReview = CatchAsync(async (req, res, next) => {
  const book = await Book.findById(req.body.id).populate('userReviews');
  res.status(200).json({
    status: true,
    message: 'Success!',
    data: {
      book,
    },
  });
});

exports.updateReview = CatchAsync(async (req, res, next) => {
  const review = await Review.findById(req.body.id);
  if (!review.user.equals(req.user._id)) {
    return next(
      new AppError('You are not authorize to update this review!', 403)
    );
  }
  review.rating = req.body.rating;
  review.review = req.body.review;
  await review.save();
  res.status(200).json({
    status: true,
    message: 'Update Success!',
    data: {
      review,
    },
  });
});

exports.deleteReview = CatchAsync(async (req, res, next) => {
  const review = await Review.findById(req.body.id);
  if (!review.user.equals(req.user._id)) {
    return next(
      new AppError('You are not authorize to delete this review!', 403)
    );
  }
  await Review.findByIdAndDelete(req.body.id);
  res.status(204).json({
    status: true,
    message: 'Delete Success!',
    data: null,
  });
});
