import axios from 'axios';
import addBook from './AddBook.module.css';
import ImageUpload from './../user/registration/ImageUpload';

const AddBook = () => {
  axios
    .post('/book', { name: 'Jivan' })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  return (
    <div className={addBook.container}>
      <label>
        Enter Book title *:
        <input type='text' />
      </label>
      <label>
        Enter Book Category *:
        <input type='text' />
      </label>
      <label>
        Description *:
        <textarea className={addBook.dis} type='text' />
      </label>
      <ImageUpload />
      <button className={addBook.btn} type='submit' value='Submit'>
        Submit
      </button>
    </div>
  );
};
export default AddBook;
