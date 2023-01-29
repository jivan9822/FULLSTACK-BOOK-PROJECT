const { CatchAsync } = require('../errors/CatchAsync');
const Book = require('../models/Book');
const Review = require('../models/Review');

exports.addReview = CatchAsync(async (req, res, next) => {
  req.body.reviewedAt = Date.now();
  req.body.user = req.user._id;
  req.body.userName = `${req.user.fname} ${req.user.lname}`;
  console.log(req.body);
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
