import axios from 'axios';
import addBook from './AddBook.module.css';
import ImageUpload from './../user/registration/ImageUpload';
import { useState } from 'react';

const AddBook = () => {
  const [image, setImage] = useState(null);
  const [bookDetails, setBookDetails] = useState({
    title: '',
    category: '',
    description: '',
    photo: '',
  });

  const onInput = (imageData) => {
    setImage(imageData.image);
  };
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
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', bookDetails.title);
    formData.append('category', bookDetails.category);
    formData.append('description', bookDetails.description);
    formData.append('photo', image);
    axios
      .post('/book', formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className={addBook.bookContainer}>
      <label className={addBook.booklabel}>
        Enter Book title *:
        <input
          className={addBook.bookinput}
          onChange={onChangeHandler}
          name='title'
          type='text'
        />
      </label>
      <label className={addBook.booklabel}>
        Enter Book Category *:
        <input
          className={addBook.bookinput}
          onChange={onChangeHandler}
          name='category'
          type='text'
        />
      </label>
      <label className={addBook.booklabel}>
        Description *:
        <textarea
          onChange={onChangeHandler}
          className={addBook.dis}
          type='text'
          name='description'
        />
      </label>
      <ImageUpload onInput={onInput} />
      <button
        className={addBook.bookBtn}
        onClick={onClickHandler}
        type='submit'
        value='Submit'
      >
        Submit
      </button>
    </div>
  );
};
export default AddBook;
