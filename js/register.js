const express = require('express');
const user = require('../db/register.json');
const Router = express.Router();

Router.post('/hasil', (req, res) => {
    // Add new user data to the JSON data
    const newUser = {
      nama: req.body.nama,
      email: req.body.email,
      password: req.body.password
    };
    user.users.push(newUser);
  
    // Send updated JSON data as the response
    res.json(user);
  });

module.exports = Router;