import { useEffect, useState } from 'react';
import profile from './userprofile.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { editValidate } from '../validation/loginValidation';

const UserProfile = (props) => {
  const navigate = useNavigate();
  const { fname, lname, phone, email } = props.userData.user;
  const [image, setImage] = useState(null);
  const [edit, setEdit] = useState(true);
  const [errMsg, setErrMsg] = useState({});
  const [userDetail, setUserDetails] = useState({
    fname,
    lname,
    phone,
    email,
  });

  useEffect(() => {
    props.isValidUser();
  }, []);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    if (e.target.files && e.target.files.length) {
      setImage(e.target.files[0]);
    }
    setUserDetails((old) => {
      return { ...old, [name]: value };
    });
  };

  const onClickHandler = (e) => {
    const formData = new FormData();
    formData.append('fname', fname);
    formData.append('lname', lname);
    formData.append('phone', phone);
    formData.append('email', email);
    formData.append('photo', image);
    e.preventDefault();
    const validate = editValidate(userDetail);
    if (!Object.keys(validate).length) {
      axios
        .patch('/user/profile', formData)
        .then((res) => {
          alert('Update Success!');
          navigate('/');
          window.location.reload();
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    } else {
      setErrMsg(validate);
    }
  };

  return (
    <>
      {edit ? (
        <div className={profile.container}>
          <h2>FirstName: {fname}</h2>
          <h2>LastName: {lname}</h2>
          <h2>MobileNo: {phone}</h2>
          <h2>Email: {email}</h2>
          <div>
            <button className={profile.btn} onClick={() => setEdit(!edit)}>
              Edit
            </button>
          </div>
        </div>
      ) : (
        <form className={profile.form}>
          <input
            type='text'
            onChange={onChangeHandler}
            placeholder='FirstName'
            value={userDetail.fname}
            name='fname'
            className={profile.input}
          />
          <p>{errMsg.fname}</p>
          <input
            type='text'
            onChange={onChangeHandler}
            placeholder='LastName'
            value={userDetail.lname}
            name='lname'
            className={profile.input}
          />
          <p>{errMsg.lname}</p>
          <input type='file' name='photo' onChange={onChangeHandler} />
          <input
            type='text'
            onChange={onChangeHandler}
            placeholder='Mobile'
            value={userDetail.phone}
            name='phone'
            className={profile.input}
          />
          <p>{errMsg.phone}</p>
          <input
            type='text'
            onChange={onChangeHandler}
            placeholder='Email'
            value={userDetail.email}
            name='email'
            className={profile.input}
          />
          <p>{errMsg.email}</p>
          <div className={profile.btnManage}>
            <button className={profile.btn} onClick={onClickHandler}>
              Submit
            </button>
            <button className={profile.btn} onClick={() => setEdit(!edit)}>
              Cancel
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default UserProfile;
