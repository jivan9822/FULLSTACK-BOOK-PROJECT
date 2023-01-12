import axios from 'axios';

const CheckUser = (props) => {
  axios
    .post('/user/isValid')
    .then((res) => {
      console.log(res.data.data.user);
      return true;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
};

export default CheckUser;
