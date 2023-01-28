const { CatchAsync } = require('../errors/CatchAsync');
const Book = require('../models/Book');

exports.AddBook = CatchAsync(async (req, res, next) => {
  req.body.author = req.user._id;
  const book = await Book.create(req.body);
  res.status(201).json({
    status: true,
    message: 'Book create success!',
    data: {
      book,
    },
  });
});
