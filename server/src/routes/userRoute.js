const router = require('express').Router();
const user = require('../controllers/userController');
const auth = require('../middleware/auth');

router.route('/').post(user.userRegistration);

router.post('/login', auth.authenticate, user.userLogin);
router.get('/logout', user.userLogOut);
router.get('/isValid', auth.isLoggedIn);

router
  .route('/profile')
  .post(auth.protect, user.userProfile)
  .patch(auth.protect, user.updateProfile);

module.exports = router;
