import { Route, Routes } from 'react-router-dom';
import HomePage from './components/homePage/HomePage';
import UserRegistration from './components/user/registration/UserRegistration';
import UserProfile from './components/user/UserProfile';
import Login from './components/user/login/Login';
import axios from 'axios';
import { useEffect, useState } from 'react';
import LogOut from './components/user/login/LogOut';

function App() {
  const [loginStatus, setLoginStatus] = useState(false);
  const [userData, setUserData] = useState({});
  const isValidUser = () => {
    axios
      .get('/user/isValid')
      .then((res) => {
        console.log(res);
        console.log(res.data.status);
        setLoginStatus(res.data.status);
        setUserData({ user: res.data.data.user });
      })
      .catch((err) => {
        console.log(err);
        setLoginStatus(false);
      });
  };

  useEffect(() => {
    isValidUser();
  }, []);

  return (
    <Routes>
      <Route
        path='/'
        element={
          <HomePage
            loginStatus={loginStatus}
            isValidUser={isValidUser}
            userData={userData}
          />
        }
      >
        <Route
          path='userRegistration'
          element={<UserRegistration isValidUser={isValidUser} />}
        />
        <Route path='login' element={<Login isValidUser={isValidUser} />} />
        <Route path='logout' element={<LogOut isValidUser={isValidUser} />} />
        <Route
          path='userProfile'
          element={
            <UserProfile isValidUser={isValidUser} userData={userData} />
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
