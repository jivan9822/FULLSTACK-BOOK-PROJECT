import { Link } from 'react-router-dom';
import admin from './Admin.module.css';
const Admin = (props) => {
  let isAdmin = false;
  if (props.userData.user) {
    if (props.userData.user.roll === 'admin') {
      isAdmin = true;
    }
  }
  return (
    <div className={admin.mainDiv}>
      {isAdmin ? (
        <div className={admin.mainDiv}>
          <Link className={admin.link} to='/logout'>
            <h1 className={admin.linkH1}>Log out</h1>
          </Link>
          <Link className={admin.link} to='/userProfile'>
            <h1 className={admin.linkH1}>
              Welcome-{props.userData.user.fname}
            </h1>
          </Link>
          <Link className={admin.link} to='/addbook'>
            <h1 className={admin.linkH1}>Add Book</h1>
          </Link>
          <Link className={admin.link} to='/users'>
            <h1 className={admin.linkH1}>Get user data</h1>
          </Link>
        </div>
      ) : (
        <div className={admin.mainDiv}>
          <Link className={admin.link} to='/logout'>
            <h1 className={admin.linkH1}>Log out</h1>
          </Link>
          <Link className={admin.link} to='/userProfile'>
            <h1 className={admin.linkH1}>
              Welcome-{props.userData.user.fname}
            </h1>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Admin;
