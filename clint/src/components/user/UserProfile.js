import { useEffect, useState } from 'react';
import procss from './userprofile.module.css';

const UserProfile = (props) => {
  useEffect(() => {
    props.isValidUser();
  }, []);
  const { fname, lname, phone, email } = props.userData.user;
  const [edit, setEdit] = useState(true);
  const [userDetail, setUserDetails] = useState({
    fname,
    lname,
    phone,
    email,
  });
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setUserDetails((old) => {
      return { ...old, [name]: value };
    });
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
          <input
            type='text'
            onChange={onChangeHandler}
            placeholder='LastName'
            value={userDetail.lname}
            name='lname'
            className={procss.input}
          />
          <input
            type='text'
            onChange={onChangeHandler}
            placeholder='Mobile'
            value={userDetail.phone}
            name='phone'
            className={procss.input}
          />
          <input
            type='text'
            onChange={onChangeHandler}
            placeholder='Email'
            value={userDetail.email}
            name='email'
            className={procss.input}
          />
          <div className={procss.btnManage}>
            <button className={procss.btn}>Submit</button>
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
