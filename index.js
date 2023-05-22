const express = require('express');
const fs = require('fs');
const app = express();
const user = require('./db/register.json');
const bodyParser = require('body-parser');
const {datauser, userhistory, Sequelize, sequelize} = require ('./models');
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

app.get('/loginadmin', (req, res)=>{
  res.render(__dirname+'/views/superadmin')
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


//LOGIN
const adminlogin = require('./js/superadmin');
app.use(adminlogin);


app.get('/userlist', async function(req, res){
    try{
        //ambil data customer di db
        let user = await datauser.findAll();
        user = user.map(function (data){
            return data.toJSON()
        })
        //tampilkan halaman
        res.render('crud', {datauser: user})
    }catch(error){
      console.log(error);
      res.status(500).send('Internal Server Error!')
    }
})


  app.get('/user/add',async function (req, res) {
    try {
      const data = await datauser.findAll();
      res.render('cu', { isUpdate: false, datauser: data });
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error!');
    }
  }); 


app.post('/user/add', async function (req, res) {
    const transaction = await sequelize.transaction()
    try {
      // ambil data dari body
      const { username, email, password, ...sisa } = req.body;
      // simpan data ke database
      const userData = await datauser.create({ username, email, password }, { transaction });
      await userhistory.create({ ...sisa, userId: userData.id }, { transaction });
      await transaction.commit();
      console.log(userData);
      // jika berhasil, redirect ke halaman utama
      res.redirect('/userlist');
    } catch(error) {
      await transaction.rollback();
      console.log(error)
      res.status(500).send('Internal Server Error !')
    }
  
  });  

  app.get('/user/update', async function (req, res) {
    const transaction = await sequelize.transaction()
    try {
      const id = req.query.id
      //Ambil data di db
      const Data = await datauser.findOne({
        where: {id},
        attributes: [
          'id',
          'username',
          'email',
          'password',
          [Sequelize.col('"userhistory"."score"'),'score'],
        ],
        include:[
          {
          model : userhistory,
          attributes : []
        }
        ]
      })
      res.render('update', {datauser: Data.toJSON(), isUpdate:true})
    } catch(error) {
      await transaction.rollback();
      console.log(error)
      res.status(500).send('Internal Server Error !')
    }
  
  });

  app.post('/user/update', async function (req, res) {
    const transaction = await sequelize.transaction()
    try {
      //ambil query
      const id = req.query.id
      // ambil data dari body
      const { username, email, password, ...sisa } = req.body;
      //update data
      const Data = await datauser.update({ username, email, password },{where:{id},  transaction});
      await userhistory.update({ ...sisa, userId: Data.id },{where: {userId:id},  transaction }); 
      await transaction.commit();
      // jika berhasil, redirect ke halaman utama
      res.redirect('/userlist');
    } catch(error) {
      await transaction.rollback();
      console.log(error)
      res.status(500).send('Internal Server Error !')
    }
  
  });

  app.post('/user/delete', async function (req, res) {
    const transaction = await sequelize.transaction()
    try {
      //ambil query
      const id = req.query.id
      //update data
      await userhistory.destroy({where: {userId:id},  transaction }); 
      await datauser.destroy({where:{id},  transaction});
      await transaction.commit();
      // jika berhasil, redirect ke halaman utama
      res.redirect('/userlist');
    } catch(error) {
      await transaction.rollback();
      console.log(error)
      res.status(500).send('Internal Server Error !')
    }
  
  });



  app.use((req, res) => {
    res.status(404).send("Page not found");
  }); 


app.listen(process.env.PORT,()=>{
    console.log(`Server berjalan di PORT ${process.env.PORT}`);
});
