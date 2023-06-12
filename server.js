const express = require('express');
const fs = require('fs');
const app = express();
const user = require('./db/register.json');
const bodyParser = require('body-parser');
const {mainController, } = require('./controllers/mainController');
const {crudcontroller} = require('./controllers/crudcontroller');
const {col} = require('sequelize');


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
app.get('/home', mainController.showHomePage);

app.get('/game',mainController.showGamePage);

app.get('/register', mainController.showRegisterPage);
app.post('/register', mainController.RegisterPage);

app.get('/login', mainController.showLoginPage);

app.get('/loginadmin', mainController.showLoginAdminPage);

app.get('/DataUser', crudcontroller.showDataUserPage);

app.get('/user/add', crudcontroller.showDataUser);
app.post('/user/add', crudcontroller.addDataUser);

app.get('/user/update', crudcontroller.showUpdateDataUser);
app.post('/user/update', crudcontroller.updateDataUser);

app.post('/user/delete', crudcontroller.deleteDataUser);


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


//LOGIN
const adminlogin = require('./js/superadmin');
app.use(adminlogin);



  app.use((req, res) => {
    res.status(404).send("Page not found");
  }); 


app.listen(process.env.PORT,()=>{
    console.log(`Server berjalan di PORT ${process.env.PORT}`);
});
