import { useEffect, useState } from 'react';
import procss from './userprofile.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { editValidate } from '../validation/loginValidation';

const UserProfile = (props) => {
  const navigate = useNavigate();
  const { fname, lname, phone, email } = props.userData.user;
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
    setUserDetails((old) => {
      return { ...old, [name]: value };
    });
  };

  const onClickHandler = (e) => {
    e.preventDefault();
    const validate = editValidate(userDetail);
    console.log(validate);
    if (!Object.keys(validate).length) {
      axios
        .patch('/user/profile', userDetail)
        .then((res) => {
          console.log(res);
          alert('Updation Success!');
          navigate('/');
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
        <div className={procss.container}>
          <h2>FirstName: {fname}</h2>
          <h2>LastName: {lname}</h2>
          <h2>MobileNo: {phone}</h2>
          <h2>Email: {email}</h2>
          <div>
            <button className={procss.btn} onClick={() => setEdit(!edit)}>
              Edit
            </button>
          </div>
        </div>
      ) : (
        <form className={procss.form}>
          <input
            type='text'
            onChange={onChangeHandler}
            placeholder='FirstName'
            value={userDetail.fname}
            name='fname'
            className={procss.input}
          />
          <p>{errMsg.fname}</p>
          <input
            type='text'
            onChange={onChangeHandler}
            placeholder='LastName'
            value={userDetail.lname}
            name='lname'
            className={procss.input}
          />
          <p>{errMsg.lname}</p>
          <input
            type='text'
            onChange={onChangeHandler}
            placeholder='Mobile'
            value={userDetail.phone}
            name='phone'
            className={procss.input}
          />
          <p>{errMsg.phone}</p>
          <input
            type='text'
            onChange={onChangeHandler}
            placeholder='Email'
            value={userDetail.email}
            name='email'
            className={procss.input}
          />
          <p>{errMsg.email}</p>
          <div className={procss.btnManage}>
            <button className={procss.btn} onClick={onClickHandler}>
              Submit
            </button>
            <button className={procss.btn} onClick={() => setEdit(!edit)}>
              Cancel
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default UserProfile;
