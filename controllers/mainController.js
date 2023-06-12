const { Datauser} = require('../models/datauser');
const cryptojs = require('crypto-js');
const JWT = require('jsonwebtoken');
const { datauser, userhistory, Sequelize, sequelize } = require('../models');
// const {UserModel} = require('../models/userModel');

class mainController {
    static showHomePage(req, res){
       
        res.render('HomePage');
    }

    static showGamePage(req, res){
        res.render('GamePage')
    }

    static showUserPage(req, res){
        const decodeToken = JWT.decode(req.cookies.token);
        res.render('HomePage/indexAfterLogin',{username : decodeToken.username})
    }

    static showRegisterPage(req, res){
        res.render('Register', {isWrong: "hidden"});
    }

    static showGameUserPage(req, res){
        res.render('GamePage/gameAfterLogin');
    }
    notAuthorized
    static notAuthorized(req, res){
        res.render('NotAuthorized');
    }
    static async RegisterPage(req, res){
        try{
            const { username, email, password,confirm_password} = req.body;
            // Validasi input user 
            if ( password !== confirm_password){
               return res.render('Register', {isWrong: ""} )
            }
            //Hash Password
            const hashedPassword = cryptojs.HmacSHA256(password, process.env.SECRET_LOGIN).toString();
            //Insert username dan password
            await datauser.create({ username,email, password:hashedPassword });
    
            res.redirect('/login');
           }catch(error){
            console.log(error);
            res.render('error' , {error, message:'Database Error'});
           }
    }

    static showLoginPage(req, res){
        res.render('Login', {isWrong: "hidden"});
    }

    
    static async LoginPage(req, res){
        const Username = req.body.username;
        const Password = req.body.password;
        try {
            //Ambil data user
            const userData = await datauser.findOne({
              where: {
                username: Username,
              },
            });
        
            //1. Handle user tidak ada
            if (userData === null) {
              console.log('User tidak ada');
              return res.render('Login', { isWrong: "" });
            }
        
            //Bandingkan password
            const hashedPassword = cryptojs.HmacSHA256(Password, process.env.SECRET_LOGIN).toString();
            if (hashedPassword !== userData.password) {
              console.log('Stored hashed password:', userData.password);
              console.log('Input hashed password:', hashedPassword);
              console.log('Incorrect password');
              return res.render('Login', { isWrong: "" });
            }
        
            //Bikin token untuk otorisasi user
            const token = JWT.sign({ Username, id: userData.id }, process.env.JWT_SECRET, { expiresIn: '5m' });
            res.cookie('token', token, { maxAge: 300000  });
            res.redirect('/user-page?username='+ Username);

            //untuk JSON
            // res.json({ success: true, message: 'Login successful' });

          } catch (error) {
            console.log(error);
            res.render('error', { error, message: 'Database Error' });
          }
    }


    static showLoginAdminPage(req, res){
        res.render('SuperAdmin', {isWrong: "hidden"});
    }

    static async LoginAdminPage(req, res){
        const Username = req.body.username;
        const Password = req.body.password;
        try {
            //Ambil data user
            const userData = await datauser.findOne({
              where: {
                username: Username,
              },
            });
        
            //1. Handle user tidak ada
            if (userData === null || userData.username !== 'admin') {
              console.log('Salah username');
              return res.render('SuperAdmin', { isWrong: "" });
            }
            //Bandingkan password
            const hashedPassword = cryptojs.HmacSHA256(Password, process.env.SECRET_LOGIN).toString();
            if (hashedPassword !== 'c0920250c4e1ca1427026b089e5be0d50c0716cc5334a75ec0ddc6ca04956332') {
              console.log('Stored hashed password:', userData.password);
              console.log('Input hashed password:', hashedPassword);
              console.log('Incorrect password');
              return res.render('SuperAdmin', { isWrong: "" });
            }
            //Bikin token untuk otorisasi user
            const token = JWT.sign({ Username, id: userData.id }, process.env.JWT_SECRET, { expiresIn: '5m' });
            res.cookie('token', token, { maxAge: 300000  });
            res.redirect('DataUser');

            //untuk JSON
            // res.json({ success: true, message: 'Login successful' });

          } catch (error) {
            console.log(error);
            res.render('error', { error, message: 'Database Error' });
          }
    }

    static logout(req, res){
        res.clearCookie('token');
        res.redirect('HomePage');
    }

};

module.exports = {mainController};