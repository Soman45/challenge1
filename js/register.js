const express = require('express');
const user = require('../db/register.json');
const Router = express.Router();

//CATATAN!!!!
//Kalo mau nambahin data lewat page ejs-nya maka req.query atau yang berhubungan harus di-comment
//Kalo mau nambahin data lewat page query-nya maka req.body atau yang berhubungan harus di-comment

Router.post('/users', (req, res) => {
  if (!req.body.nama || !req.body.email || !req.body.password) {
    res.status(400).json({ error: "Data harus diisi" });
    return;
  } 
  // if (!req.query.nama || !req.query.email || !req.query.password) {
  //   res.status(400).json({ error: "Data harus diisi" });
  //   return;
  // } 

    // Add new user data to the JSON data
    const newUser = {
      nama: req.body.nama,
      email: req.body.email,
      password: req.body.password
    };
    // const newQuery = {
    //   nama: req.query.nama,
    //   email: req.query.email,
    //   password: req.query.password
    // };
    // user.users.push(newQuery);
    user.users.push(newUser);
    res.json(user);
  });

module.exports = Router;