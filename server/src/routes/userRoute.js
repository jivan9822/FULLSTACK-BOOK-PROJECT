const router = require('express').Router();
const user = require('../controllers/userController');
const auth = require('../middleware/auth');

router.route('/').post(user.userRegistration);

router.post('/login', auth.authenticate, user.userLogin);
router.post('/isValid', auth.protect, user.isValid);

router.post('/profile', auth.protect, user.userProfile);

module.exports = router;
