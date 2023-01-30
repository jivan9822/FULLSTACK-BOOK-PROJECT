const mongoose = require('mongoose');
const Book = require('../models/Book');

const ReviewSchema = mongoose.Schema({
  //   bookId: {ObjectId, mandatory, refs to book model},
  bookId: {
    type: mongoose.Types.ObjectId,
    ref: 'Book',
    required: true,
  },
  //   reviewedBy: {string, mandatory, default 'Guest', value: reviewer's name},
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  //   reviewedAt: {Date, mandatory},
  reviewedAt: {
    type: Date,
    required: true,
  },
  //   rating: {number, min 1, max 5, mandatory},
  rating: {
    type: Number,
    min: 0,
    max: 5,
    required: true,
  },
  //   review: {string, optional}
  review: {
    type: String,
  },
  //   isDeleted: {boolean, default: false},
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

ReviewSchema.index({ user: 1, bookId: 1 }, { unique: true });

ReviewSchema.statics.calAvgRat = async function (bookId) {
  const stats = await this.aggregate([
    {
      $match: { bookId },
    },
    {
      $group: {
        _id: '$bookId',
        nRating: { $sum: 1 },
        avgRat: { $avg: '$rating' },
      },
    },
  ]);
  if (stats.length) {
    await Book.findByIdAndUpdate(bookId, {
      reviews: stats[0].nRating,
      avgRating: stats[0].avgRat,
    });
  } else {
    await Book.findByIdAndUpdate(bookId, {
      reviews: 0,
      avgRating: 4.5,
    });
  }
};

ReviewSchema.post('save', function () {
  this.constructor.calAvgRat(this.bookId);
});

ReviewSchema.pre(/^findOne/, async function (next) {
  this.r = await this.find().clone();
  next();
});

ReviewSchema.post(/^findOne/, async function () {
  await this.r[0].constructor.calAvgRat(this.r[0].bookId);
});

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;
