import ReviewForm from './ReviewRateForm';
import review from './Reviews.module.css';
import { useState } from 'react';
import axios from 'axios';

const deleteReview = (id) => {
  axios
    .delete('/review/id', {
      data: {
        id: id,
      },
    })
    .then((res) => {
      alert('Review Delete Success!!');
      window.location.reload();
    })
    .catch((err) => {
      alert('You Are Not Authorize to delete this review!!!');
    });
};

const Reviews = (props) => {
  const [isUpdate, setUpdate] = useState(false);
  const [id, setId] = useState();
  const books = props.books;
  const onDeleteHandler = (e) => {
    e.preventDefault();
    if (window.confirm('Are You Sure?')) {
      deleteReview(e.target.value);
    }
  };
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
                <li className={review.liele} key={book._id}>
                  <h4>
                    <span style={{ color: '#312E81', fontFamily: 'cursive' }}>
                      {book.userName}
                    </span>
                  </h4>
                  <h4>
                    Rating:{' '}
                    <span style={{ color: 'orange', fontFamily: 'cursive' }}>
                      {book.rating}
                    </span>
                  </h4>
                  <h4>
                    Review:{' '}
                    <p style={{ color: 'orange', fontFamily: 'cursive' }}>
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
                    <button
                      name='bookId'
                      value={book._id}
                      className={review.delBtnRev}
                      onClick={onDeleteHandler}
                    >
                      Delete
                    </button>
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
