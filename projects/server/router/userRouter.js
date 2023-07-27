const express = require('express');
const useController = require('../controller/userController');
const router = express.Router();

router.get('/homee', useController.greet);

module.exports = router;