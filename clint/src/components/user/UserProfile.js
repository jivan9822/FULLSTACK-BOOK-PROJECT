import { useEffect } from 'react';

const UserProfile = (props) => {
  console.log(props.userData);
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
