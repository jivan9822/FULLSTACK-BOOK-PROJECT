import addRev from '../../book/AddBook.module.css';
import axios from 'axios';
import { useState } from 'react';

const ReviewForm = (props) => {
  const [char, setChar] = useState(50);
  const [ratingData, setRatingData] = useState({
    id: props.id,
    rating: 0,
    review: '',
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
    console.log(ratingData);
  };
  console.log(props.id);
  return (
    <div className={addRev.bookContainer} style={{ maxWidth: '50%' }}>
      <h1>Rating</h1>
      <label className={addRev.booklabel}>
        Pleas rate this Book 1 to 5*:
        <input
          className={addRev.bookinput}
          onChange={onChangeHandler}
          name='rating'
          id='input1'
          type='number'
          value={ratingData.rating}
          placeholder='Rating from 0-5'
        />
      </label>
      <label className={addRev.booklabel}>
        Write a review Max (<span>{char}</span>):
        <textarea
          onChange={onChangeHandler}
          className={addRev.dis}
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
          className={addRev.bookBtn}
          onClick={onClickHandler}
          type='submit'
          value='Submit'
          id='submit'
        >
          Submit
        </button>
        <button
          className={addRev.bookBtn}
          type='submit'
          onClick={() => props.setUpdate(false)}
          value='Submit'
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ReviewForm;
