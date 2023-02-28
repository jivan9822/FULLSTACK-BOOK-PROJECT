## Project - Books Management

GitHub - https://github.com/jivan9822/FULLSTACK-BOOK-PROJECT

### Key points

- User have to register this app to having access.
- Authors can also register to publish there books.
- After verification admin will set authors access.
- User can read, rate book and write a review to book.
- Author have full access to there books to perform crud operations.

### Security

- JWT token used to handle authentication and authorization.
- After successfully login token will set in cookies clint side.
- To avid multiple data base calls cache is used to handle protected route authorization.
- Currently book and user images are stored in local file of server it would be set in Aws s3

### Error Handling

- Error handling is handled from clint side and server side also.
- Before submitting form from clint all verification done.
- Some of error like duplicate email or any server side error like token expiration etc are handled by nodejs default error handler.
