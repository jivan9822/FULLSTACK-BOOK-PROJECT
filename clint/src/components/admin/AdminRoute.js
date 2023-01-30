import { Link } from 'react-router-dom';
import admin from './Admin.module.css';
const Admin = (props) => {
  let isAdmin = false;
  let isAuthor = false;
  if (props.userData.user) {
    if (props.userData.user.roll === 'admin') {
      isAdmin = true;
    }
    if (props.userData.user.roll === 'author') {
      isAuthor = true;
    }
  }
  return (
    <div className={admin.mainDiv}>
      {isAdmin || isAuthor ? (
        <div className={admin.mainDiv}>
          <Link className={admin.link} to='/logout'>
            <h1 className={admin.linkH1}>Log out</h1>
          </Link>
          <Link className={admin.link} to='/userProfile'>
            <div className={admin.linkImage}>
              <h1
                className={admin.linkH1}
                onClick={() => props.setDisplay(false)}
              >
                Welcome-{props.userData.user.fname}
              </h1>
              <img
                src={props.userData.user.photo}
                width='50px'
                height='50px'
                style={{ borderRadius: '50%' }}
              />
            </div>
          </Link>
          <Link className={admin.link} to='/addbook'>
            <h1
              className={admin.linkH1}
              onClick={() => props.setDisplay(false)}
            >
              Add Book
            </h1>
          </Link>
          {isAdmin && (
            <Link className={admin.link} to='/users'>
              <h1
                className={admin.linkH1}
                onClick={() => props.setDisplay(false)}
              >
                Get user data
              </h1>
            </Link>
          )}
        </div>
      ) : (
        <div className={admin.mainDiv}>
          <Link className={admin.link} to='/logout'>
            <h1 className={admin.linkH1}>Log out</h1>
          </Link>
          <Link className={admin.link} to='/userProfile'>
            <div className={admin.linkImage}>
              <h1
                onClick={() => props.setDisplay((old) => !old)}
                className={admin.linkH1}
              >
                Welcome-{props.userData.user.fname}
              </h1>
              <img
                src={props.userData.user.photo}
                width='50px'
                height='50px'
                style={{ borderRadius: '50%' }}
              />
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Admin;
