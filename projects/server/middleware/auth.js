const jwt = require('jsonwebtoken')

module.exports = {
    verifyToken : (req, res, next) => {
        const token = req.headers.authorization.split(' ')[1]
        const verifiedToken = jwt.verify(token, 'minpro123')
        req.user = verifiedToken;
        console.log("Done verify token")
        next()
    },
    verifyAdmin: (req, res, next) => {
        if (!req.user.isAdmin) res.status(400).send({ 
            status: false,
            message: 'Access admin Denied'
        });
        next()
    },
    verifyCashier: (req, res, next) => {
        if (req.user.isAdmin) res.status(400).send({
            status: false,
            message: "Access cashier denied"
        });
        next()
    }
}