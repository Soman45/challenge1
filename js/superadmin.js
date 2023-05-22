const express = require('express');
// const user = require('../db/register.json');
const Router = express.Router();
const { datauser } = require('../models');
// Login form submission
Router.post('/loginadmin', async (req, res) => {
    const Username = req.body.nama;
    const Password = req.body.password;
    try{
      const cek = await datauser.findOne({
        where: {
          username: Username,
          password: Password,
        },
      });
      if (cek) {
        res.redirect('/userlist');
    } else {
      res.send('Username atau password salah');
    }
    }catch{
      console.log(error);
      res.status(500).send('Internal Server Error!')
    }
    
    
  });
  
  module.exports = Router;