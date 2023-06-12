const express = require('express');
const registerData = require('../db/register.json');
const Router = express.Router();
// const { datauser } = require('../models');
// Login form submission
Router.post('/loginadmin', async (req, res) => {
    const Username = req.body.nama;
    const Password = req.body.password;
    const user = registerData.users.find(user => user.username === Username && user.password === Password);
  if (user) {
    res.redirect('DataUser');
  } else {
    res.send('Username atau Password salah');
  }
    
    
  });
  
  module.exports = Router;