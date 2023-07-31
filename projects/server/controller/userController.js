const db = require('../models')
const user = db.user
const jwt = require('jsonwebtoken')
const enkrip = require('bcrypt')
const { Op } = require('sequelize')
const transporter = require('../middleware/transporter')

const useController = {
  register : async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const d = await user.findOne ({
        where : {
          [Op.or] : [
            {username},
            {email},
          ]
        }
      });
      if (d == null) {
        const salt = await enkrip.genSalt(10);
        const hashPassword = await enkrip.hash(password, salt);
        const result = await user.create({ username, email, password : hashPassword });
        // const token = jwt.sign({ username, email, password }, "minpro123", {expiresIn :'1h'});
      
        await transporter.sendMail({
          from: "handikaprasetya.wisnu@gmail.com",
          to: email,
          subject :'test',
          html : '<h1>Sukses</h1>'
        });

        res.status(200).send({
          status : true,
          message : 'success',
          data : result,
          // token
        });
      }else{
        if (d.username == username) {throw({message:`Username must be unique`})}
        if (d.email == email) {throw({message:`Email must be unique`})}
        res.send('failed')
      }
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
  },
  login: async (req, res)=> {
    try {
      const {username, email, password } = req.body;
      if (!username && !email) {throw({message:' Error'})}
      if (!password)  {throw({message:'Error'})}
      const data = await user.findOne({
        where : {
          [Op.or] : [
            {username},
            {email},
          ]
        }
      });
      if (data == null) {throw({message : 'tidak ada akun'})}
      if (!data) {throw({message : 'cerification'})}
      const isValid = await enkrip.compare(password, data.password);
      if (!isValid) {throw({message:"wrong pass!"})}
      const payLoad = {
        id: data.id,
        username:data.username,
        email:data.email,
        imgURL: data.imgURL
      }
      const token = jwt.sign(payLoad, "minpro123");
      res.status(200).send({
        message : 'Success',
        data,
        token : token
      });
    } catch (error) {
      console.log(error)
      res.status(400).send(error);
    }
  },
  keepLogin: async (req, res) => {
    console.log("masuk keep login")
    console.log(req.user)
    try {
      const result = await user.findOne({
        where: {
          id: req.user.id
        }
      })
      const { id, username } = result
      res.status(200).send({
        id : id, 
        username: username
      })
    } catch (error) {
      console.log(error)
      res.status(400).send(error)
    }
  },
  editPass: async (req, res) => {
    console.log("masuk edit password")
    console.log(req.user)
    try {
      const {currentPassword, newPassword, confirmPassword} = req.body;
      const getData = await user.findOne({ where: {id: req.user.id}})
      const checkPass = await enkrip.compare(currentPassword, getData.password);
      if (checkPass == false) {
        throw ({message: "Wrong password!"})
      } if (newPassword !== confirmPassword) {
        throw ({message: "password doesnt match!"})
      }
      const salt = await enkrip.genSalt(10);
      const hashPassword = await enkrip.hash(newPassword, salt);
      const setData = await user.update(
        {password: hashPassword},
        {where: {
          id: req.user.id
        }});
      res.status(200).send({
        message: 'Password has been changed'
      });
    } catch (error) {
      console.log(error)
      res.status(400).send(error)
    }
  },
  forgotPass: async (req, res) => {
    try {
      const {email} = req.body;
      const isEmailExist = await user.findOne({
        where : {
          email : email
        }
      });
      if (isEmailExist !== null) {
        const {id, username, email} = isEmailExist;
        const token = jwt.sign({id, username, email}, "minpro123");
        await transporter.sendMail({
          from : "handikaprasetya.wisnu@gmail.com",
          to : email,
          subject : 'Change password',
          html :'<h1> Success </h1>'
        })
        res.status(200).send({
          message : 'check your mail',
          token
        });
      }
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },
  resetPassword : async(req, res) =>{
    try {
      const salt = await enkrip.genSalt(10);
      const hashPassword = await enkrip.hash(req.body.newPassword, salt);
      const setData = await user.update(
        {password : hashPassword},
        {where :{
          id : req.user.id
        }});
      res.status(200).send({
        message : 'reset password sukses'
      });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },
}

module.exports = useController;