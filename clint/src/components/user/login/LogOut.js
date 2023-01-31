import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LogOut = (props) => {
  const navigate = useNavigate();
  axios
    .get('/user/logout')
    .then((res) => {
      props.isValidUser();
      // window.location.reload();
      navigate('/login');
    })
    .catch((err) => {
      console.log(err);
    });
};

export default LogOut;
