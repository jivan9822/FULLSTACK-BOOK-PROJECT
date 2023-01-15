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

exports.editValidate = (data) => {
  const { fname, lname, phone, email } = data;
  const error = {};
  if (!/^[6-9]\d{9}$/i.test(phone)) {
    error.phone = 'Please enter a valid phone number!';
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    error.email = 'Please enter a valid email id!';
  }
  if (fname.length < 2 || /\d/.test(fname)) {
    error.fname = 'Please enter First Name more than two alpha beats only!';
  }
  if (lname.length < 2 || /\d/.test(fname)) {
    error.lname = 'Please enter Last Name more than two alpha beats only!';
  }
  return error;
};
