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
    photo: {
      type: String,
    },
    reviews: {
      type: Number,
      default: 0,
    },
    bookLink: {
      type: String,
    },
    avgRating: {
      type: Number,
      default: 4.5,
      set: (val) => Math.round(val * 100) / 100,
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
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
BookSchema.virtual('userReviews', {
  ref: 'Review',
  foreignField: 'bookId',
  localField: '_id',
});

BookSchema.pre(/^find/, function (next) {
  this.find({ isDeleted: false });
  next();
});

const Book = mongoose.model('Book', BookSchema);
module.exports = Book;
