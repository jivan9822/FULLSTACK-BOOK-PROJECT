import { useEffect } from 'react';

const UserProfile = (props) => {
  useEffect(() => {
    props.isValidUser();
  }, []);
  return (
    <div>
      <h1>UserProfile</h1>
    </div>
  );
};

export default UserProfile;
