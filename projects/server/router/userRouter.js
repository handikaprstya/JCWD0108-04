const express = require('express');
const userController = require('../controller/userController');
const { verifyToken } = require('../middleware/auth');
const router = express.Router();


router.post('/register', userController.register);
router.post('/login', userController.login)
router.get("/keep", userController.keepLogin)
router.patch("/changePass", verifyToken, userController.editPass)

module.exports = router;