const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth-controller');
const authentication = require('../middlewares/authentication');

router.get('/is-user-connected', authController.isUserConnected_get);
router.post('/sign-in', authController.signIn_post);
router.post('/login', authController.login_post);

module.exports = router;