const express = require('express');
const {updateUser, getUserInfo } = require('../controllers/userController');
const router = express.Router()
const authenticateMiddleware = require('../utils/verifyToken');


router.get('/userinfo', authenticateMiddleware, getUserInfo);
router.put('/user', authenticateMiddleware, updateUser);

module.exports = router;


