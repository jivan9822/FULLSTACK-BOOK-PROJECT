import addBook from '../AddBook.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RateBook = (props) => {
  const navigate = useNavigate();
  const [char, setChar] = useState(50);
  const [ratingData, setRatingData] = useState({
    rating: '',
    review: '',
    bookId: '',
  });
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    if (name == 'review') {
      setChar(50 - value.length);
      if (50 - value.length >= 0) {
        document.getElementById('input2').style.color = 'white';
        document.getElementById('submit').style.display = '';
      } else {
        document.getElementById('input2').style.color = 'red';
        document.getElementById('submit').style.display = 'none';
      }
    } else if (name == 'rating' && (value > 5 || value < 1)) {
      document.getElementById('input1').style.color = 'red';
      document.getElementById('submit').style.display = 'none';
    } else {
      document.getElementById('input1').style.color = 'white';
      document.getElementById('submit').style.display = '';
    }

    setRatingData((old) => {
      return {
        ...old,
        [name]: value,
      };
    });
  };
  const onClickHandler = (e) => {
    ratingData.bookId = props.book._id;
    axios
      .post('/review', ratingData)
      .then((res) => {
        console.log(res);
        alert('Review added success!');
        navigate('/');
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        alert(
          'You have already a rating for this book! Multiple review not allowed!!!'
        );
      });

    setRatingData({
      rating: '',
      review: '',
    });
    e.preventDefault();
  };

  const onCancelHandler = (e) => {
    props.setRatePage(false);
    e.preventDefault();
  };

  return (
    <div className={addBook.bookContainer}>
      <h1>Rating</h1>
      <label className={addBook.booklabel}>
        Pleas rate this Book 1 to 5*:
        <input
          className={addBook.bookinput}
          onChange={onChangeHandler}
          name='rating'
          id='input1'
          type='number'
          value={ratingData.rating}
          placeholder='Rating from 0-5'
        />
      </label>
      <label className={addBook.booklabel}>
        Write a review Max (<span>{char}</span>):
        <textarea
          onChange={onChangeHandler}
          className={addBook.dis}
          type='text'
          name='review'
          value={ratingData.review}
          rows={4}
          cols={40}
          id='input2'
        />
      </label>
      <div
        style={{
          display: 'flex',
          gap: '50px',
        }}
      >
        <button
          className={addBook.bookBtn}
          onClick={onClickHandler}
          type='submit'
          value='Submit'
          id='submit'
        >
          Submit
        </button>
        <button
          className={addBook.bookBtn}
          type='submit'
          onClick={onCancelHandler}
          value='Submit'
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default RateBook;
