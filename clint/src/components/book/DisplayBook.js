import display from './DisplayBook.module.css';
const Books = [
  {
    id: 1,
    title: 'Harry Porter - 1',
    photo:
      'https://m.media-amazon.com/images/I/51PcUAhn15L._SX498_BO1,204,203,200_.jpg',
    category: 'Story',
  },
  {
    id: 2,
    title: 'Harry Porter - 1',
    photo:
      'https://m.media-amazon.com/images/I/51PcUAhn15L._SX498_BO1,204,203,200_.jpg',
    category: 'Story',
  },
  {
    id: 3,
    title: 'Harry Porter - 1',
    photo:
      'https://m.media-amazon.com/images/I/51PcUAhn15L._SX498_BO1,204,203,200_.jpg',
    category: 'Story',
  },
  {
    id: 4,
    title: 'Harry Porter - 1',
    photo:
      'https://m.media-amazon.com/images/I/51PcUAhn15L._SX498_BO1,204,203,200_.jpg',
    category: 'Story',
  },
  {
    id: 5,
    title: 'Harry Porter - 1',
    photo:
      'https://m.media-amazon.com/images/I/51PcUAhn15L._SX498_BO1,204,203,200_.jpg',
    category: 'Story',
  },
  {
    id: 6,
    title: 'Harry Porter - 1',
    photo:
      'https://m.media-amazon.com/images/I/51PcUAhn15L._SX498_BO1,204,203,200_.jpg',
    category: 'Story',
  },
  {
    id: 7,
    title: 'Harry Porter - 1',
    photo:
      'https://m.media-amazon.com/images/I/51PcUAhn15L._SX498_BO1,204,203,200_.jpg',
    category: 'Story',
  },
  {
    id: 8,
    title: 'Harry Porter - 1',
    photo:
      'https://m.media-amazon.com/images/I/51PcUAhn15L._SX498_BO1,204,203,200_.jpg',
    category: 'Story',
  },
  {
    id: 9,
    title: 'Harry Porter - 1',
    photo:
      'https://m.media-amazon.com/images/I/51PcUAhn15L._SX498_BO1,204,203,200_.jpg',
    category: 'Story',
  },
  {
    id: 10,
    title: 'Harry Porter - 1',
    photo:
      'https://m.media-amazon.com/images/I/51PcUAhn15L._SX498_BO1,204,203,200_.jpg',
    category: 'Story',
  },
  {
    id: 11,
    title: 'Harry Porter - 1',
    photo:
      'https://m.media-amazon.com/images/I/51PcUAhn15L._SX498_BO1,204,203,200_.jpg',
    category: 'Story',
  },
  {
    id: 12,
    title: 'Harry Porter - 1',
    photo:
      'https://m.media-amazon.com/images/I/51PcUAhn15L._SX498_BO1,204,203,200_.jpg',
    category: 'Story',
  },
  {
    id: 13,
    title: 'Harry Porter - 1',
    photo:
      'https://m.media-amazon.com/images/I/51PcUAhn15L._SX498_BO1,204,203,200_.jpg',
    category: 'Story',
  },
  {
    id: 14,
    title: 'Harry Porter - 1',
    photo:
      'https://m.media-amazon.com/images/I/51PcUAhn15L._SX498_BO1,204,203,200_.jpg',
    category: 'Story',
  },
  {
    id: 15,
    title: 'Harry Porter - 1',
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
            <h2>{book.title}</h2>
            <img src={book.photo} width='150px' height='150px' />
            <h2>{book.category}</h2>
          </li>
        );
      })}
    </div>
  );
};
export default DisplayBooks;
