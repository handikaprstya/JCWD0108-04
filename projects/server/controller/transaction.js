const db = require('../models')
const transaction = db.transaction
const sequelize = require('sequelize')
const transDetail = require('../models/transdetail')
const { QueryTypes } = require('sequelize');

const transactionController = {
    dailyReport: async (req, res) => {
        try {
            const report = await transaction.findAll({
                attributes: [
                    // [Sequelize.literal(`DATE("createdAt")`), 'date'],
                    [sequelize.fn('DATE', sequelize.col('createdAt')), 'Date'],
                    [sequelize.literal(`COUNT(*)`), 'count'],
                    [sequelize.fn('sum', sequelize.col('buyerAmmount')), 'total_amount']
                ],
                // group: ['date'],
                group: [sequelize.fn('DATE', sequelize.col('createdAt')), 'Date']
            })
            res.status(200).send({
                status : true,
                message : 'Success get total per day',
                data: report
            })
        } catch (error) {
            console.log(error)
            res.status(400).send(error)
        }
    },
    transaction: async (req, res) => {
        try {
            console.log("id", req.params.id)
            // const result =  await transaction.findOne({
            //     // where: {id: req.params.id}, 
            //     include: {
            //         model: transDetail,
            //         // where: {
            //         //     transactionId : +req.params.id,
            //         // },
            //       },
            // })

            const query = `SELECT tr.id, tr.total, tr.buyerAmmount, tr.buyerChange, tr.userId, td.productQty, td.productId, pr.productName
            FROM transaction tr
            LEFT JOIN transdetail td ON tr.id=td.transactionId
            LEFT JOIN product pr ON pr.id=td.productId
            where tr.id = ${req.params.id}
            `

            const qres = await db.sequelize.query(query, {
                type: QueryTypes.SELECT
              });
            res.status(200).send({
                status : true,
                message : 'Success get transaction',
                data: qres
            })
        } catch (error) {
            console.log(error)
            res.status(400).send(error)
        }
    },
    report: async (req, res) => {
        try {
            const startDate = new Date(req.query.startDate)
            const endDate = new Date(req.query.endDate)
            console.log(startDate)
            console.log(endDate)
            const query = `SELECT tr.id, tr.total, tr.buyerAmmount, tr.buyerChange, tr.userId, td.productQty, td.productId, pr.productName
            FROM transaction tr
            LEFT JOIN transdetail td ON tr.id=td.transactionId
            LEFT JOIN product pr ON pr.id=td.productId
            where tr.createdAt >= '${req.query.startDate}' and tr.createdAt <= '${req.query.endDate}'`
            const qres = await db.sequelize.query(query, {
                type: QueryTypes.SELECT
              });
            res.status(200).send({
             status: true,
             message: "success",   
             data: qres
            })
        } catch (error) {
            console.log(error)
            res.status(400).send(error)
        }
    }
}


module.exports = transactionController