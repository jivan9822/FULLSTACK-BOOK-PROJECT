import axios from 'axios';
import { useState, useEffect } from 'react';
import ImageUpload from '../../user/registration/ImageUpload';
import addBook from '../AddBook.module.css';
import { useNavigate } from 'react-router-dom';

const UpdateHandler = (props) => {
  const navigate = useNavigate();

  const book = props.bookData[0];
  const [image, setImage] = useState(null);
  const [bookDetails, setBookDetails] = useState({
    id: book._id,
    title: book.title,
    category: book.category,
    description: book.description,
    photo: '',
  });
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setBookDetails((old) => {
      return {
        ...old,
        [name]: value,
      };
    });
  };
  const onClickHandler = (e) => {
    if (!image) {
      alert('Please select book cover!');
    } else {
      e.preventDefault();
      const formData = new FormData();
      formData.append('id', book._id);
      formData.append('title', bookDetails.title);
      formData.append('category', bookDetails.category);
      formData.append('description', bookDetails.description);
      formData.append('photo', image);
      axios
        .patch('/book', formData)
        .then((res) => {
          console.log(res);
          alert('Book update Success!');
          navigate('/');
          window.location.reload();
        })
        .catch((err) => {
          alert('You are not authorize for this!');
          console.log(err);
        });
    }
  };
  const onCancelHandler = (e) => {
    props.setIsUpdate(false);
  };
  const onInput = (imageData) => {
    setImage(imageData.image);
  };
  return (
    <div className={addBook.bookContainer}>
      <label className={addBook.booklabel}>
        Enter Book title *:
        <input
          className={addBook.bookinput}
          onChange={onChangeHandler}
          placeholder={book.title}
          name='title'
          type='text'
        />
      </label>
      <label className={addBook.booklabel}>
        Enter Book Category *:
        <input
          className={addBook.bookinput}
          placeholder={book.category}
          onChange={onChangeHandler}
          name='category'
          type='text'
        />
      </label>
      <label className={addBook.booklabel}>
        Description *:
        <textarea
          onChange={onChangeHandler}
          placeholder={book.description}
          className={addBook.dis}
          type='text'
          name='description'
        />
      </label>
      <div className={addBook.twoImg}>
        <img
          src={book.photo}
          alt='Preview'
          style={{
            width: '150px',
            height: '150px',
          }}
        />
        <ImageUpload onInput={onInput} />
      </div>

      <button
        className={addBook.bookBtn}
        onClick={onClickHandler}
        type='submit'
        value='Submit'
      >
        Submit
      </button>
      <button
        className={addBook.bookBtn}
        onClick={onCancelHandler}
        type='submit'
      >
        Cancel
      </button>
    </div>
  );
};

export default UpdateHandler;
