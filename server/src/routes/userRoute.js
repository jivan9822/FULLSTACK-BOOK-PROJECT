const router = require('express').Router();
const user = require('../controllers/userController');

router.route('/').post(user.userRegistration);

module.exports = router;
