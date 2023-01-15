import axios from 'axios';
import login from './Login.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { loginValidate } from '../../validation/loginValidation';

const Login = (props) => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState({});
  const [errorMsg, setErrorMsg] = useState('');
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  const onClickHandler = async (e) => {
    e.preventDefault();
    const validate = loginValidate(input);
    if (!Object.keys(validate).length) {
      await axios
        .post('/user/login', input)
        .then((res) => {
          props.isValidUser();
          navigate('/');
        })
        .catch((err) => {
          setErrorMsg(err.response.data.message);
        });
    } else {
      setError(validate);
    }
  };
  return (
    <div>
      <form className={errorMsg ? login.hide : login.form}>
        <input
          onChange={onChangeHandler}
          className={login.input}
          type='text'
          placeholder='Email id'
          name='email'
          value={input.email}
        />
        <p className={login.inputPara}>{error.email}</p>
        <input
          onChange={onChangeHandler}
          className={login.input}
          type='password'
          placeholder='Enter Password'
          name='password'
          value={input.password}
        />
        <p className={login.inputPara}>{error.password}</p>

        <button onClick={onClickHandler} className={login.btn} type='submit'>
          Login
        </button>
      </form>
      <div className={errorMsg ? login.form : login.hide}>
        <h3 className={login.msgErr}>{errorMsg}</h3>
        <div>
          <Link className={login.errorText} to='/userRegistration'>
            <p>Click here to register</p>
          </Link>
          <Link className={login.errorText} to='/login'>
            <p
              onClick={() => {
                setErrorMsg(null);
              }}
            >
              Try again
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Login;
