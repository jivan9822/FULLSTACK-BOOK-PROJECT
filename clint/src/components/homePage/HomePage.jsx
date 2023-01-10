import { Link, Outlet } from 'react-router-dom';
import home from './styleHome.module.css';
import { Fragment } from 'react';

const HomePage = () => {
  return (
    <Fragment>
      <header className={home.header}>
        <Link className={home.heading} to='/'>
          <h1>Book Management</h1>
        </Link>
        <div className={home.navItems}>
          <Link className={home.link} to='/login'>
            <h1 className={home.linkH1}>Login</h1>
          </Link>
          <Link className={home.link} to='/userRegistration'>
            <h1 className={home.linkH1}>Register</h1>
          </Link>
          <Link className={home.link} to='/userProfile'>
            <h1 className={home.linkH1}>Profile</h1>
          </Link>
        </div>
      </header>
      <Outlet />
    </Fragment>
  );
};

export default HomePage;
