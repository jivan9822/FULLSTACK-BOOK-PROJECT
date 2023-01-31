import { Link } from 'react-router-dom';
import display from './DisplayBook.module.css';
import { useState, useEffect } from 'react';
import DeleteHandler from './UpdateDel/Delete';
import UpdateHandler from './UpdateDel/Update';
import BookDisplay from './UpdateDel/BookDetails';

const DisplayBooks = (props) => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [isDisplay, setIsDisplay] = useState(false);
  const [hideDisplay, setHideDisplay] = useState(false);
  const [bookData, setBookData] = useState();
  const onClickUpdateHandler = (e) => {
    setIsDisplay(false);
    setHideDisplay(true);
    setIsUpdate(true);
    const book = props.books.filter((each) => each._id === e.target.value);
    setBookData(book);
    e.preventDefault();
  };
  const BookDisplayHandler = (e) => {
    setIsUpdate(false);
    setHideDisplay(true);
    setIsDisplay(true);
    const book = props.books.filter((each) => each._id === e.target.value);
    setBookData(book);
    e.preventDefault();
  };
  const onClickDelHandler = (e) => {
    DeleteHandler(e.target.value);
  };
  return hideDisplay ? (
    <div>
      {isUpdate && (
        <UpdateHandler setHideDisplay={setHideDisplay} bookData={bookData} />
      )}
      {isDisplay && (
        <BookDisplay setHideDisplay={setHideDisplay} bookData={bookData} />
      )}
    </div>
  ) : (
    <div className={display.gridCont}>
      {props.books.map((book) => {
        return (
          <li key={book._id}>
            <img className={display.bookImg} src={book.photo} height='250px' />
            <div>
              <span>User Avg Rating: </span>
              <span className={display.ratandrev}>{book.avgRating}</span>
            </div>
            <div>
              <span>Total Reviews: </span>
              <span className={display.ratandrev}>{book.reviews}</span>
            </div>
            <div className={display.linkdiv}>
              <button
                type='submit'
                name='edit'
                value={book._id}
                className={display.updateBtn}
                onClick={onClickUpdateHandler}
              >
                edit
              </button>
              <button
                className={display.link}
                name='details'
                value={book._id}
                onClick={BookDisplayHandler}
              >
                {' '}
                MoreDetails
              </button>
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
