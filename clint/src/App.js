import { Route, Routes } from 'react-router-dom';
import HomePage from './components/homePage/HomePage';
import UserRegistration from './components/user/registration/UserRegistration';
import UserProfile from './components/user/UserProfile';
import Login from './components/user/login/Login';
import axios from 'axios';
import { useEffect, useState } from 'react';
import LogOut from './components/user/login/LogOut';
import './App.css';
import GetAllUsers from './components/user/GetAllUsers';
import AddBook from './components/book/AddBook';

function App() {
  const [loginStatus, setLoginStatus] = useState(false);
  const [userData, setUserData] = useState({});
  const [books, setBooks] = useState([]);
  const isValidUser = () => {
    axios
      .get('/user/isValid')
      .then((res) => {
        console.log(res);
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
    axios
      .get('/book')
      .then((res) => {
        setBooks([...res.data.data.books]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <Routes>
      <Route
        path='/'
        element={
          <HomePage
            books={books}
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
        <Route path='users' element={<GetAllUsers />} />
        <Route path='addbook' element={<AddBook />} />
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
