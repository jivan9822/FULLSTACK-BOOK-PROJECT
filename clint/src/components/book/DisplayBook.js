import { Link } from 'react-router-dom';
import display from './DisplayBook.module.css';
import { useState } from 'react';
import DeleteHandler from './UpdateDel/Delete';
import UpdateHandler from './UpdateDel/Update';

const DisplayBooks = (props) => {
  const onClickUpdateHandler = (e) => {
    const book = props.books.filter((each) => each._id === e.target.value);
    UpdateHandler(book[0]);
  };
  const onClickDelHandler = (e) => {
    DeleteHandler(e.target.value);
  };
  return (
    <div className={display.gridCont}>
      {props.books.map((book) => {
        return (
          <li key={book._id}>
            <div>
              <h2 className={display.title}>{book.title}</h2>
            </div>
            <img src={book.photo} height='250px' />
            <div>
              <span style={{ fontFamily: 'cursive', color: 'black' }}>
                {book.authorName}
              </span>
            </div>
            <div className={display.linkdiv} to='#'>
              <button
                type='submit'
                name='edit'
                value={book._id}
                className={display.updateBtn}
                onClick={onClickUpdateHandler}
              >
                edit
              </button>
              <p className={display.link}> ReadBook</p>
              <button
                type='submit'
                name='delete'
                value={book._id}
                className={display.delBtn}
                onClick={onClickDelHandler}
              >
                delete
              </button>
            </div>
          </li>
        );
      })}
    </div>
  );
};
export default DisplayBooks;
