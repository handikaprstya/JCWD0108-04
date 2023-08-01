const express = require('express')
const router = express.Router()
const transactionController = require('../controller/transaction')

router.get('/dailyReport', transactionController.dailyReport)
router.get('/report', transactionController.report)
router.get('/:id', transactionController.transaction)


module.exports = router