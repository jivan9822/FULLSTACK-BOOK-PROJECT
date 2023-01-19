import reg from '../registration/UserReg.module.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { userValidate } from '../../validation/userValidate';

const UserRegistration = (props) => {
  const [input, setInput] = useState({
    title: '',
    fname: '',
    lname: '',
    phone: '',
    email: '',
    address: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState({});
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInput((old) => {
      return {
        ...old,
        [name]: value,
      };
    });
  };
  const onClickHandler = async (e) => {
    e.preventDefault();
    const validate = userValidate(input);
    if (!Object.keys(validate).length) {
      await axios
        .post('/user', { data: input })
        .then((res) => {
          alert('Registration Success!');
          setInput({
            title: '',
            fname: '',
            lname: '',
            phone: '',
            email: '',
            address: '',
            password: '',
            confirmPassword: '',
          });
          setError({});
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    } else {
      setError(validate);
    }
  };

  return (
    <form className={reg.mainForm}>
      <div className={reg.option}>
        <div>
          <select
            className={reg.select}
            name='title'
            value={input.title}
            onChange={onChangeHandler}
          >
            <option>Select</option>
            <option value='Mr'>Mr</option>
            <option value='Mrs'>Mrs</option>
            <option value='Miss'>Miss</option>
          </select>
          <p className={reg.para}>{error.title}</p>
        </div>
        <div>
          <input
            onChange={onChangeHandler}
            className={reg.inputOnly}
            value={input.fname}
            name='fname'
            placeholder='FIRST NAME'
          />
          <p className={reg.para}>{error.fname}</p>
        </div>
        <div>
          <input
            className={reg.inputOnly}
            name='lname'
            value={input.lname}
            placeholder='LAST NAME'
            onChange={onChangeHandler}
          />
          <p className={reg.para}>{error.lname}</p>
        </div>
      </div>
      <div>
        <input
          className={reg.inputOnly}
          name='phone'
          value={input.phone}
          placeholder='MOBILE NUMBER'
          onChange={onChangeHandler}
        />
        <p className={reg.para}>{error.phone}</p>
      </div>
      <div>
        <input
          className={reg.inputOnly}
          name='email'
          value={input.email}
          placeholder='EMAIL'
          onChange={onChangeHandler}
        />
        <p className={reg.para}>{error.email}</p>
      </div>
      <div>
        <input
          type='file'
          className={reg.inputOnly}
          name='photo'
          onChange={onChangeHandler}
        />
        <span>Choose Your Photo</span>
      </div>
      <div>
        <input
          className={reg.inputOnly}
          name='address'
          value={input.address}
          placeholder='ADDRESS'
          onChange={onChangeHandler}
        />
        <p className={reg.para}>{error.address}</p>
      </div>
      <div>
        <input
          type='password'
          className={reg.inputOnly}
          name='password'
          value={input.password}
          placeholder='PASSWORD'
          onChange={onChangeHandler}
        />
        <p className={reg.para}>{error.password}</p>
      </div>
      <div>
        <input
          type='password'
          className={reg.inputOnly}
          name='confirmPassword'
          value={input.confirmPassword}
          placeholder='CONFIRM PASSWORD'
          onChange={onChangeHandler}
        />
        <p className={reg.para}>{error.confirmPassword}</p>
      </div>
      <button className={reg.button} onClick={onClickHandler}>
        SUBMIT
      </button>
    </form>
  );
};

export default UserRegistration;
