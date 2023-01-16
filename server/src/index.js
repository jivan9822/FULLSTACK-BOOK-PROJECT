require('dotenv').config({ path: 'config.env' });
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const userRoute = require('../src/routes/userRoute');
const bookRoute = require('../src/routes/bookRoute');
const { AppError } = require('./errors/AppError');
const { globalErrorHandler } = require('./errors/globalError');
const app = express();
app.use(express.json());
app.use(multer().any());
app.use(cors());
app.use(cookieParser());

mongoose.set('strictQuery', true);
mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log('server connection to mongodb successful!');
  })
  .catch((error) => {
    console.log(error);
  });

app.use('/user', userRoute);
app.use('/book', bookRoute);

app.all('*', (req, res, next) => {
  return next(new AppError(`The ${req.originalUrl} not found in server!`, 400));
});

app.use(globalErrorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
