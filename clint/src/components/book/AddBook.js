import axios from 'axios';

const AddBook = () => {
  axios
    .post('/book', { name: 'Jivan' })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  return <h1>Add Book</h1>;
};
export default AddBook;
