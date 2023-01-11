const router = require('express').Router();
const user = require('../controllers/userController');
const auth = require('../middleware/auth');

router.route('/').post(user.userRegistration);

router.post('/login', auth.protect, user.userLogin);

module.exports = router;
