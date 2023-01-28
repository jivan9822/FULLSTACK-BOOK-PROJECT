import axios from 'axios';
const DeleteHandler = (id) => {
  if (window.confirm('Are You Sure?')) {
    axios
      .post('/book/del', { id: id })
      .then((res) => {
        console.log(res);
        if (res.status === 204) {
          alert('Book delete Success!');
          window.location.reload();
        }
      })
      .catch((err) => {
        alert('You Are Not Authorize to perform this operation!');
      });
  }
};

export default DeleteHandler;
