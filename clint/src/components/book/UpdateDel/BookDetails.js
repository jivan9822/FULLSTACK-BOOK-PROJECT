import bookDis from './BookDetails.module.css';

const BookDisplay = (props) => {
  const book = props.bookData[0];
  console.log(book);
  const onMainDisplayHandler = (e) => {
    e.preventDefault();
    props.setHideDisplay(false);
  };
  return (
    <div className={bookDis.cont}>
      <img src={book.photo} />
      <div>
        <h2>Title: {book.title}</h2>
        <h2>Author: {book.authorName}</h2>
        <h2>Average Rating: {book.avgRating}</h2>
        <h2>Category: {book.category}</h2>
        <h2>Description: {book.description}</h2>
        <h2>Book Ratings: {book.ratings}</h2>
        <h2>Book Reviews: {book.reviews}</h2>
        <button onClick={onMainDisplayHandler}>Back</button>
        <button>Rate This Book</button>
      </div>
    </div>
  );
};
export default BookDisplay;
