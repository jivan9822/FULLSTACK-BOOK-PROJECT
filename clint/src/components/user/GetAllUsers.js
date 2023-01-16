import axios from 'axios';
import { useState, useEffect } from 'react';
import usersStyle from './getusers.module.css';
const GetAllUsers = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get('/user/allusers')
      .then((res) => {
        res.data.users.sort((a, b) => (a.fname > b.fname ? 1 : -1));
        setUsers(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const onClickSort = (e) => {
    e.preventDefault();
    const sortUsers = users.reverse();
    setUsers([...sortUsers]);
  };
  return (
    <table className={usersStyle.users}>
      <tbody>
        <tr>
          <th>
            <div className={usersStyle.icondiv}>
              Name
              <div className={usersStyle.icbtn}>
                <button onClick={onClickSort}>▲</button>
                <button onClick={onClickSort}>▼</button>
              </div>
            </div>
          </th>
          <th>Mobile</th>
          <th>Email</th>
        </tr>
        {users.map((user) => {
          return (
            <tr key={user._id}>
              <td>{user.fname}</td>
              <td>{user.phone}</td>
              <td>{user.email}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default GetAllUsers;
