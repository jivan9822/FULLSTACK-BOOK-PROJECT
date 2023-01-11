import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import HomePage from './components/homePage/HomePage';
import UserRegistration from './components/user/registration/UserRegistration';
import UserProfile from './components/user/UserProfile';
import Login from './components/user/login/Login';

function App() {
  const [user, setUser] = useState({});
  return (
    <Routes>
      <Route path='/' element={<HomePage />}>
        <Route path='userRegistration' element={<UserRegistration />} />
        <Route path='login' element={<Login setUser={setUser} />} />
        <Route path='userProfile' element={<UserProfile />} />
      </Route>
    </Routes>
  );
}

export default App;
