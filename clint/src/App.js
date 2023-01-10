import { Route, Routes } from 'react-router-dom';
import HomePage from './components/homePage/HomePage';
import UserRegistration from './components/user/registration/components';
import UserProfile from './components/user/UserProfile';
import Login from './components/user/login/Login';

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />}>
        <Route path='userRegistration' element={<UserRegistration />} />
        <Route path='login' element={<Login />} />
        <Route path='userProfile' element={<UserProfile />} />
      </Route>
    </Routes>
  );
}

export default App;
