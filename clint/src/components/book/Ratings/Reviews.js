import axios from 'axios';
import { useState } from 'react';

const Reviews = (props) => {
  const books = props.books;
  const onClickHandler = (e) => {
    props.setReadReview(false);
    e.preventDefault();
  };
  return (
    <div>
      <button onClick={onClickHandler}>Back</button>
      {books.map((book) => {
        return (
          <div key={book._id}>
            <h1>{book.userName}</h1>
            <p>{book.rating}</p>
            <p>{book.review}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Reviews;
