import { Link } from 'react-router-dom';
import display from './DisplayBook.module.css';
const Books = [
  {
    id: 1,
    title: 'Harry Porter - 1',
    author: 'J K Rolling',
    review: [],
    avgReview: 4.5,
    photo:
      'https://m.media-amazon.com/images/I/51PcUAhn15L._SX498_BO1,204,203,200_.jpg',
    category: 'Story',
  },
  {
    id: 2,
    title: 'Harry Porter - 1',
    author: 'J K Rolling',
    review: [],
    avgReview: 4.5,
    photo:
      'https://m.media-amazon.com/images/I/51PcUAhn15L._SX498_BO1,204,203,200_.jpg',
    category: 'Story',
  },
];

const DisplayBooks = () => {
  return (
    <div className={display.gridCont}>
      {Books.map((book) => {
        return (
          <li key={book.id}>
            <div>
              <h2 className={display.title}>{book.title}</h2>
            </div>
            <img src={book.photo} height='250px' />
            <div>
              <span style={{ fontFamily: 'cursive', color: 'black' }}>
                {book.author}
              </span>
            </div>
            <Link className={display.link} to='#'>
              ReadBook
            </Link>
          </li>
        );
      })}
    </div>
  );
};
export default DisplayBooks;
