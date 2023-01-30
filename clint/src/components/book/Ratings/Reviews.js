import ReviewForm from './ReviewRateForm';
import review from './Reviews.module.css';
import { useState } from 'react';

const Reviews = (props) => {
  const [isUpdate, setUpdate] = useState(false);
  const [id, setId] = useState();
  const books = props.books;
  const onClickHandler = (e) => {
    props.setReadReview(false);
    e.preventDefault();
  };
  return (
    <div>
      {isUpdate ? (
        <ReviewForm setUpdate={setUpdate} id={id} />
      ) : (
        <div>
          <button onClick={onClickHandler}>Back</button>
          <div className={review.revGrid}>
            {books.map((book) => {
              return (
                <li key={book._id}>
                  <h4>
                    <span style={{ color: '#312E81', fontFamily: 'cursive' }}>
                      {book.userName}
                    </span>
                  </h4>
                  <h4>
                    Rating:{' '}
                    <span style={{ color: '#312E81', fontFamily: 'cursive' }}>
                      {book.rating}
                    </span>
                  </h4>
                  <h4>
                    Review:{' '}
                    <p style={{ color: '#312E81', fontFamily: 'cursive' }}>
                      {book.review}
                    </p>
                  </h4>
                  <div className={review.linkdivRev}>
                    <button
                      onClick={() => {
                        setUpdate(true);
                        setId(book._id);
                      }}
                      className={review.updateBtnRev}
                    >
                      Edit
                    </button>
                    <button className={review.delBtnRev}>Delete</button>
                  </div>
                </li>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Reviews;
