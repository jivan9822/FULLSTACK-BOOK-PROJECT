import bookDis from './BookDetails.module.css';
import { useState } from 'react';
import RateBook from '../Ratings/RateBook';
import Reviews from '../Ratings/Reviews';
import axios from 'axios';

const BookDisplay = (props) => {
  const [isRatePage, setRatePage] = useState(false);
  const [readReview, setReadReview] = useState(false);
  const [bookWithReview, setBookWithReview] = useState([]);
  const book = props.bookData[0];
  const onMainDisplayHandler = (e) => {
    e.preventDefault();
    props.setHideDisplay(false);
  };
  const onRatingHandler = (e) => {
    e.preventDefault();
    setRatePage(true);
  };
  const onReviewHandler = async (e) => {
    e.preventDefault();
    const data = await axios.post('/review/id', { id: book._id });
    setBookWithReview(data.data.data.book.userReviews);
    setReadReview(true);
  };
  return (
    <>
      {isRatePage || readReview ? (
        isRatePage ? (
          <RateBook setRatePage={setRatePage} book={book} />
        ) : (
          <Reviews setReadReview={setReadReview} books={bookWithReview} />
        )
      ) : (
        <div className={bookDis.cont}>
          <img src={book.photo} />
          <div>
            <h2>Title: {book.title}</h2>
            <h2>Author: {book.authorName}</h2>
            <h2>Category: {book.category}</h2>
            <h2>Description: {book.description}</h2>
            <h2>Book Ratings: {book.avgRating}</h2>
            <h2>
              Book Reviews: {book.reviews}
              <button onClick={onReviewHandler} className={bookDis.revBtnread}>
                ...read
              </button>
            </h2>
            <div className={bookDis.ratebtndiv}>
              <button className={bookDis.revBtn} onClick={onMainDisplayHandler}>
                Back
              </button>
              <button className={bookDis.revBtn} onClick={onRatingHandler}>
                Rate This Book
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default BookDisplay;
