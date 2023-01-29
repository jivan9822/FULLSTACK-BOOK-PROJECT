const mongoose = require('mongoose');

const BookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    author: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    authorName: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    reviews: {
      type: Number,
      default: 0,
    },
    photo: {
      type: String,
    },
    avgRating: {
      type: Number,
      default: 4.5,
      min: 0,
      max: 5,
    },
    ratings: {
      type: Number,
      default: 0,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamp: true,
  }
);

BookSchema.pre(/^find/, function (next) {
  this.find({ isDeleted: false });
  next();
});

const Book = mongoose.model('Book', BookSchema);
module.exports = Book;
