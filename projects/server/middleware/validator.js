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
    },
    changePass: async (req, res, next) => {
        try {
            await body('currentPassword').trim().notEmpty().run(req)
            await body('newPassword').trim().notEmpty().run(req)
            await body('confirmPassword').trim().notEmpty().equals(req.body.newPassword).withMessage('Password not match!').run(req)
        console.log("done change pass")
        next()

        } catch (error) {
            console.log(error)
            res.status(405).send(error)
        }
    },
    emailVeriv: async (req, res, next) =>{
        await body('email').trim().notEmpty().isEmail().withMessage('Format Email Salah').run(req);
        await body('newEmail').trim().notEmpty().isEmail().withMessage('Format Email Salah').run(req);
        const validation = validationResult(req);
          
        if (validation.isEmpty()) {
          next();
        }else{
            res.status(400).send({
            status : false,
            message : 'Validation Invalid',
            error : validation.array()
          });
        }
      },
      resPass : async (req, res, next) =>{
        await body('newPassword').trim().notEmpty().isStrongPassword({
          minLength: 6,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers : 1,
          minSymbols : 1}).run(req);
        await body('confirmPassword').trim().notEmpty().equals(req.body.newPassword).withMessage("password not match").run(req);
    
        const validation = validationResult(req);
        if (validation.isEmpty()) {
          next();
        }else{
            res.status(400).send({
            status : false,
            message : 'Validation Invalid',
            error : validation.array()
          });
        }
      }
}