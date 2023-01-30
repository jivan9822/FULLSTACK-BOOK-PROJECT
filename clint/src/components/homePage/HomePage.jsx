import { Link, Outlet } from 'react-router-dom';
import home from './styleHome.module.css';
import { Fragment, useEffect, useState } from 'react';
import Admin from '../admin/AdminRoute';
import DisplayBooks from '../book/DisplayBook';
import UpdateHandler from '../book/UpdateDel/Update';

const HomePage = (props) => {
  const loginStatus = props.loginStatus;
  const [isDisplay, setDisplay] = useState(true);
  return (
    <Fragment>
      <header className={home.header}>
        <Link className={home.heading} to='/'>
          <h1
            onClick={() => {
              props.isValidUser();
              setDisplay(true);
            }}
          >
            Book Management
          </h1>
        </Link>
        <div className={home.navItems}>
          <div>
            {loginStatus ? (
              <Admin userData={props.userData} setDisplay={setDisplay} />
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
      <main>
        {loginStatus && isDisplay && (
          <DisplayBooks books={props.books} setDisplay={setDisplay} />
        )}
        {/* {!isDisplay && <UpdateHandler setDisplay={setDisplay} />} */}
      </main>
      <Outlet />
    </Fragment>
  );
};

export default HomePage;
