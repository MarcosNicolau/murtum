const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth-controller');

router.post('/sign-in', authController.signIn_post);
router.post('/login', authController.login_post);

module.exports = router;