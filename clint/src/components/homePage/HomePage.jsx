import { Link, Outlet } from 'react-router-dom';
import home from './styleHome.module.css';
import { Fragment, useEffect, useState } from 'react';
import Admin from '../admin/AdminRoute';
import DisplayBooks from '../book/DisplayBook';
import UpdateHandler from '../book/UpdateDel/Update';

const HomePage = (props) => {
  const [isFind, setIsFind] = useState(false);
  const [searchText, setSearchText] = useState({
    searchText: '',
  });
  let book = [...props.books];
  const [bookData, setBookData] = useState(null);
  const [option, setOption] = useState();
  const loginStatus = props.loginStatus;
  const [isDisplay, setDisplay] = useState(true);
  const findHandler = (e) => {
    e.preventDefault();
    setIsFind((old) => !old);
    setSearchText({
      searchText: '',
    });
    setBookData([...book]);
  };
  const searchTextHandler = (e) => {
    const { name, value } = e.target;
    const reg = new RegExp(`${value}`, 'i');
    setBookData([
      ...book.filter((each) => {
        if (each[`${option}`].match(reg)) {
          return each;
        }
      }),
    ]);
    setSearchText({ [name]: value });
  };
  const onOptionHandler = (e) => {
    setOption(e.target.value);
  };
  return (
    <Fragment>
      <header className={home.header}>
        <Link className={home.heading} to='/'>
          <h1
            onClick={() => {
              props.isValidUser();
              setDisplay(true);
              setSearchText({
                searchText: '',
              });
              setBookData([...book]);
            }}
            className={home.headBookMam}
          >
            Book Management
          </h1>
          <div>
            <h4 onClick={findHandler} className={home.findBtn}>
              FindBook
            </h4>
            <div
              className={home.findDiv}
              style={{ display: isFind ? '' : 'none' }}
            >
              <select onChange={onOptionHandler} className={home.selectBtn}>
                <option>Select</option>
                <option value='authorName'>By Author</option>
                <option value='title'>By BookName</option>
              </select>
              <input
                className={home.searchInput}
                placeholder='type here'
                type='text'
                name='searchText'
                value={searchText.searchText}
                onChange={searchTextHandler}
              />
            </div>
          </div>
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
          <DisplayBooks
            userData={props.userData}
            books={bookData ? bookData : book}
            setDisplay={setDisplay}
          />
        )}
        {/* {!isDisplay && <UpdateHandler setDisplay={setDisplay} />} */}
      </main>
      <Outlet />
    </Fragment>
  );
};

export default HomePage;
