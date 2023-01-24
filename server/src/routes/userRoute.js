const router = require('express').Router();
const user = require('../controllers/userController');
const auth = require('../middleware/auth');
const {
  uploadUserPhoto,
  resizeUserPhoto,
} = require('../middleware/fileUploads');

router.route('/').post(uploadUserPhoto, resizeUserPhoto, user.userRegistration);

router.post('/login', auth.authenticate, user.userLogin);
router.get('/logout', user.userLogOut);
router.get('/isValid', auth.isLoggedIn);
router.get('/allusers', auth.protect, user.getAllUsers);

router
  .route('/profile')
  .post(auth.protect, user.userProfile)
  .patch(auth.protect, uploadUserPhoto, resizeUserPhoto, user.updateProfile);

module.exports = router;
