import reg from '../registration/UserReg.module.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { userValidate } from '../../validation/userValidate';
import ImageUpload from './ImageUpload';
import { useNavigate } from 'react-router-dom';

const UserRegistration = (props) => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    title: '',
    fname: '',
    lname: '',
    phone: '',
    email: '',
    address: '',
    password: '',
    photo: '',
    confirmPassword: '',
  });
  const [error, setError] = useState({});
  const onInput = (imageData) => {
    setInput((old) => {
      return {
        ...old,
        photo: imageData.image,
      };
    });
  };
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
    const formData = new FormData();
    formData.append('photo', input.photo);
    formData.append('title', input.title);
    formData.append('fname', input.fname);
    formData.append('lname', input.lname);
    formData.append('phone', input.phone);
    formData.append('email', input.email);
    formData.append('address', input.address);
    formData.append('password', input.password);
    formData.append('confirmPassword', input.confirmPassword);
    if (!Object.keys(validate).length) {
      await axios
        .post('/user', formData)
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
            photo: '#',
            confirmPassword: '',
          });
          setError({});
          navigate('/login');
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    } else {
      setError(validate);
    }
  };

  return (
    <div className={reg.mainForm}>
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
        <ImageUpload id='image' onInput={onInput} />
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
    </div>
  );
};

export default UserRegistration;
