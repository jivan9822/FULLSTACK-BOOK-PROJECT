const { CatchAsync } = require('../errors/CatchAsync');

exports.AddBook = CatchAsync(async (req, res, next) => {
  console.log(req.body, 'Add Book');
  res.send('Book');
});
