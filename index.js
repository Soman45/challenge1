const express = require('express');
const fs = require('fs');
const app = express();


//VIEW ENGINE
app.set('view engine','ejs');

//MIDDLEWARE
app.use(express.static('public'));
app.use(express.static('views'));


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


//REGISTER
app.use(express.urlencoded({extended:false}));

app.get('/register', function(req,res){
    res.sendFile(__dirname+'/register.html');
});

app.post('/hasil',function(req,res){
    console.log('isi', req.body);
    res.send(`nama : ${req.body.nama}, Email : ${req.body.email}, Email : ${req.body.password}`);
});



const port = 3000
app.listen(port,()=>{
    console.log(`Server berjalan di PORT ${port}`);
});
