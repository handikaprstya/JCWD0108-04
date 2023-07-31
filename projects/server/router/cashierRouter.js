const express = require('express');
const userController = require('../controller/userController');
const  { verifyToken } = require('../middleware/auth') 
const router = express.Router();

const cashierController = require('../controller/cashierController')

router.post('/', cashierController.add);
router.get('/', cashierController.readAll);
router.patch('/:id', cashierController.updateUsername);
router.delete('/:id', cashierController.deleteCashier);



module.exports = router;