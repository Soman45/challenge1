const express = require('express');
const fs = require('fs');
const app = express();
const user = require('./db/register.json');
const bodyParser = require('body-parser');

//VIEW ENGINE
app.set('view engine','ejs');

//MIDDLEWARE
app.use(express.static('public'));
app.use(express.static('views'));
app.use(express.static('js'));
app.use(express.static('db'));
// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));



//ROUTE HALAMAN
app.get('/home', (req, res)=>{
    res.render(__dirname+'/views/index')
});

app.get('/game', (req, res)=>{
    res.render(__dirname+'/views/game')
});

app.get('/register', (req, res)=>{
    res.render(__dirname+'/views/register')
});

app.get('/login', (req, res)=>{
    res.render(__dirname+'/views/login')
});



//REGISTER
const router = require('./js/register');
app.use(router);

// app.get('/register', (req, res) => {
//     res.render('register', { user });
// });


//LOGIN
const login = require('./js/login');
app.use(login);

// app.get('/login', (req, res) => {
//     res.render(__dirname +'/views/login');
//   });
  
app.use((req, res) => {
    res.status(404).send("Page not found");
  }); 


const port = 3000
app.listen(port,()=>{
    console.log(`Server berjalan di PORT ${port}`);
});
