const AppError = require('../errors/AppError');
const { CatchAsync } = require('../errors/CatchAsync');
const Book = require('../models/Book');

exports.AddBook = CatchAsync(async (req, res, next) => {
  req.body.author = req.user._id;
  req.body.authorName = `${req.user.fname} ${req.user.lname}`;
  const book = await Book.create(req.body);
  res.status(201).json({
    status: true,
    message: 'Book create success!',
    data: {
      book,
    },
  });
});

exports.getAllBook = CatchAsync(async (req, res, next) => {
  const books = await Book.find();
  res.status(200).json({
    status: true,
    message: `${books.length} books found!`,
    data: {
      books,
    },
  });
});

exports.updateBook = CatchAsync(async (req, res, next) => {
  const book = await Book.findById(req.body.id);
  if (!book.author.equals(req.user._id)) {
    return next(
      new AppError('You are not authorize to perform this operation!', 403)
    );
  }
  const newBook = await Book.findByIdAndUpdate(
    req.body.id,
    {
      $set: req.body,
    },
    { new: true }
  );
  res.status(200).json({
    status: true,
    data: {
      book: newBook,
    },
  });
});

exports.deleteBook = CatchAsync(async (req, res, next) => {
  const book = await Book.findById(req.body.id);
  if (!book.author.equals(req.user._id)) {
    return next(
      new AppError('You are not authorize to perform this operation!', 403)
    );
  }
  book.isDeleted = true;
  await book.save();

  res.status(204).json({
    status: true,
    data: null,
  });
});
