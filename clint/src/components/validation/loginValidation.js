exports.loginValidate = (data) => {
  const { email, password } = data;
  const error = {};
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    error.email = 'Please enter a valid email id!';
  }
  if (password.length < 5) {
    error.password = 'Please enter password of min 5 char!';
  }
  return error;
};
