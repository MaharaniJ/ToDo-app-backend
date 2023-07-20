const express = require('express');
const { registerController,loginController, logoutController,isLoggedInController } = require('../controllers/auth');
const router = express.Router()

router.post('/register',registerController)
router.post('/login',loginController)
router.get('/logout',logoutController)
router.get('/is_logged_in',isLoggedInController)
module.exports =router;