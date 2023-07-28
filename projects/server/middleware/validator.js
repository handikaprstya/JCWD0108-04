const { body, validationResult } = require('express-validator');
const fs = require('fs')

module.exports = {
    checkRegister : async (req, res, next) => {
        try {
            await body('username').notEmpty().run(req);
            await body('email').notEmpty().withMessage('email is required').isEmail().run(req);
            await body('password').notEmpty().isStrongPassword({
                minLength: 6,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1
            }).run(req);
            const validation = validationResult(req);

            if (validation.isEmpty()) {
                next();
            } else {
                res.status(400).send({
                    status: false,
                    message: 'Validation Invalid',
                    error: validation.array()
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}