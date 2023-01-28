import axios from 'axios';
import { useState } from 'react';
import ImageUpload from '../../user/registration/ImageUpload';
import addBook from '../AddBook.module.css';
const UpdateHandler = (book) => {
  //   const [image, setImage] = useState(null);

  //   const onInput = (imageData) => {
  //     setImage(imageData.image);
  //   };
  console.log(book);
  //   axios
  //     .patch('/book', { name: 'Jivan' })
  //     .then((res) => {
  //       console.log(res);
  //       if (res.status === 200) {
  //         alert('Book update Success!');
  //         window.location.reload();
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   return (
  //     <div className={addBook.bookContainer}>
  //       <label className={addBook.booklabel}>
  //         Enter Book title *:
  //         <input
  //           className={addBook.bookinput}
  //           //   onChange={onChangeHandler}
  //           name='title'
  //           type='text'
  //         />
  //       </label>
  //       <label className={addBook.booklabel}>
  //         Enter Book Category *:
  //         <input
  //           className={addBook.bookinput}
  //           //   onChange={onChangeHandler}
  //           name='category'
  //           type='text'
  //         />
  //       </label>
  //       <label className={addBook.booklabel}>
  //         Description *:
  //         <textarea
  //           //   onChange={onChangeHandler}
  //           className={addBook.dis}
  //           type='text'
  //           name='description'
  //         />
  //       </label>
  //       <ImageUpload onInput={onInput} />

  //       <button
  //         className={addBook.bookBtn}
  //         // onClick={onClickHandler}
  //         type='submit'
  //         value='Submit'
  //       >
  //         Submit
  //       </button>
  //     </div>
  //   );
};

export default UpdateHandler;
