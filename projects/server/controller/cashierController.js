const db = require('../models')
const user = db.user
const jwt = require('jsonwebtoken')
const enkrip = require('bcrypt')
const { Op } = require('sequelize')
const transporter = require('../middleware/transporter')

const cashierController = {
  add : async (req, res) => {
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
        const defaultImage = 'https://thumb.viva.co.id/media/frontend/thumbs3/2022/09/01/631054190fbf5-ras-kucing-scottish-fold_1265_711.jpg'
        const salt = await enkrip.genSalt(10);
        const hashPassword = await enkrip.hash(password, salt);
        const result = await user.create({ username, email, password : hashPassword, imgURL: defaultImage });
        // const token = jwt.sign({ username, email, password }, "minpro123", {expiresIn :'1h'});
      
        // await transporter.sendMail({
        //   from: "handikaprasetya.wisnu@gmail.com",
        //   to: email,
        //   subject :'test',
        //   html : '<h1>Sukses</h1>'
        // });

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
  readAll: async (req, res) => {
    try {
      const d = await user.findAll ({
      });
        res.status(200).send({
          status : true,
          message : 'success',
          data : d,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
 },
  updateUsername: 
  async (req, res)=>{
    console.log(req.params.id)
    try {
      const { username } = req.body;
      
      const isUserExist = await user.findOne({
        where : {
          id : req.params.id
        }
      });
      if (isUserExist == null) throw {message: 'user not found'}
      const updt = await user.update(
        { username },
        {where : {id : req.params.id}}
        );
      res.status(200).send({
        message : 'change username success',
      });
    } catch (error) {
      console.log(error)
      res.status(400).send(error);
    }
  },
  deleteCashier: async (req, res) => {
      console.log(req.params.id)
      try {
        await user.destroy({
          where: {
            id: req.params.id
          }
        });
        res.status(200).send({
          message : 'Delete cashier success',
        });
      } catch (error) {
        console.log(error)
        res.status(400).send(error);
      }
    }
  }



module.exports = cashierController