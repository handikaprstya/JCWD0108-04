const express = require('express');
const userController = require('../controller/userController');
const  { verifyToken } = require('../middleware/auth') 
const router = express.Router();
const { checkRegister, changePass, resPass } = require('../middleware/validator')


router.post('/register', checkRegister, userController.register);
router.post('/login', userController.login);
router.get("/keep",verifyToken, userController.keepLogin);
router.patch("/changePass", verifyToken, changePass, userController.editPass)
router.put("/forgotPass",  userController.forgotPass);
router.patch("/resetPass", verifyToken, resPass, userController.resetPassword);



module.exports = router;