import axios from 'axios';
import addBook from './AddBook.module.css';
import ImageUpload from './../user/registration/ImageUpload';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const validate = (x) => {
  return (
    x.title.length > 3 && x.category.length > 3 && x.description.length > 3
  );
};

const AddBook = () => {
  const navigate = useNavigate();
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
    if (validate(bookDetails)) {
      document.getElementById('bookSubmit').style.display = '';
    } else {
      document.getElementById('bookSubmit').style.display = 'none';
    }
  };
  const onClickHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', bookDetails.title);
    formData.append('category', bookDetails.category);
    formData.append('description', bookDetails.description);
    formData.append('photo', image);
    if (!image) {
      alert('Please select image for book!!!');
    } else {
      axios
        .post('/book', formData)
        .then((res) => {
          alert('Book added success!');
          navigate('/');
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    }
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
          placeholder='Min 5 char'
        />
      </label>
      <label className={addBook.booklabel}>
        Enter Book Category *:
        <input
          className={addBook.bookinput}
          onChange={onChangeHandler}
          placeholder='Min 5 char'
          name='category'
          type='text'
        />
      </label>
      <label className={addBook.booklabel}>
        Description *:
        <textarea
          onChange={onChangeHandler}
          className={addBook.dis}
          placeholder='Min 5 char'
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
        id='bookSubmit'
        style={{ display: 'none' }}
      >
        Submit
      </button>
    </div>
  );
};
export default AddBook;
