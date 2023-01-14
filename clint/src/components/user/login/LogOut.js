import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LogOut = (props) => {
  const navigate = useNavigate();
  axios
    .get('/user/logout')
    .then((res) => {
      console.log(res);
      props.isValidUser();
      navigate('/');
    })
    .catch((err) => {
      console.log(err);
    });
};

export default LogOut;
