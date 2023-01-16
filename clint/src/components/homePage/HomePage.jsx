import { Link, Outlet } from 'react-router-dom';
import home from './styleHome.module.css';
import { Fragment } from 'react';
import Admin from '../admin/AdminRoute';

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
              <Admin userData={props.userData} />
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
