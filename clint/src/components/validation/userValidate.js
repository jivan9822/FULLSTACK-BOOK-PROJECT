exports.userValidate = (data) => {
  const {
    title,
    fname,
    lname,
    phone,
    email,
    address,
    password,
    confirmPassword,
  } = data;
  const error = {};
  if (!['Mr', 'Mrs', 'Miss'].includes(title)) {
    error.title = 'Please select a title!';
  }
  if (fname.length < 2) {
    error.fname = 'First name should be greater than 2 char!';
  }
  if (lname.length < 2) {
    error.lname = 'Last name should be greater than 2 char!';
  }
  if (!/^[6-9]\d{9}$/i.test(phone)) {
    error.phone = 'Please enter a valid phone number!';
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    error.email = 'Please enter a valid email id!';
  }
  if (address.length < 2) {
    error.address = 'Please enter your address!';
  }
  if (password.length < 5) {
    error.password = 'Please enter password of min 5 char!';
  }
  if (password !== confirmPassword) {
    error.confirmPassword = 'Confirm password dose not match with password!';
  }
  return error;
};
