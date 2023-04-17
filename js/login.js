const express = require('express');
const user = require('../db/register.json');
const Router = express.Router();

const registerData = require('../db/register.json');
// Login form submission
Router.post('/login', (req, res) => {
    const username = req.body.nama;
    const password = req.body.password;
    const cek = registerData.users.find(user => user.nama === username && user.password === password);
    if (cek) {
        res.send('Anda berhasil login');
    } else {
      res.send('Username atau password salah');
    }
    
  });
  
  module.exports = Router;