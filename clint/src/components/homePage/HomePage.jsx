import { Link, Outlet } from 'react-router-dom';
import home from './styleHome.module.css';
import { Fragment, useEffect } from 'react';

const HomePage = (props) => {
  const loginStatus = props.loginStatus;
  return (
    <Fragment>
      <header className={home.header}>
        <Link className={home.heading} to='/'>
          <h1 onClick={() => props.isValidUser()}>Book Management</h1>
        </Link>
        <div className={home.navItems}>
          <div>
            {loginStatus ? (
              <div>
                <Link className={home.link} to='/logout'>
                  <h1 className={home.linkH1}>Log out</h1>
                </Link>
                <Link className={home.link} to='/userProfile'>
                  <h1 className={home.linkH1}>
                    Welcome {props.userData.user.fname}
                  </h1>
                </Link>
              </div>
            ) : (
              <div>
                <Link className={home.link} to='/login'>
                  <h1 className={home.linkH1}>Login</h1>
                </Link>
                <Link className={home.link} to='/userRegistration'>
                  <h1 className={home.linkH1}>Register</h1>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>
      <Outlet />
    </Fragment>
  );
};

export default HomePage;
