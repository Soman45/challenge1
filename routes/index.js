var express = require('express');
const {mainController, } = require('../controllers/mainController');
const {crudcontroller} = require('../controllers/crudcontroller');
const {game} = require('../controllers/gameController');
const { authoriztionCheck } = require('../lib/authorizationCheck');
const {col} = require('sequelize');
var router = express.Router();

//ROUTE HALAMAN
router.get('/home', mainController.showHomePage);

router.get('/game',mainController.showGamePage);
router.get('/gameUser',mainController.showGameUserPage);

router.get('/register', mainController.showRegisterPage);
router.post('/register', mainController.RegisterPage);

router.get('/login', mainController.showLoginPage);
router.post('/login', mainController.LoginPage);

router.get('/user-page',authoriztionCheck, mainController.showUserPage);
router.post('/user-page', authoriztionCheck, mainController.LoginPage);

router.get('/loginadmin', mainController.showLoginAdminPage);
router.post('/loginadmin', mainController.LoginAdminPage);

router.get('/DataUser', authoriztionCheck, crudcontroller.showDataUserPage);

router.get('/user/add',  crudcontroller.showDataUser);
router.post('/user/add',  crudcontroller.addDataUser);

router.get('/user/update',  crudcontroller.showUpdateDataUser);
router.post('/user/update',  crudcontroller.updateDataUser);

router.post('/user/delete',  crudcontroller.deleteDataUser);

router.get('/create-room', authoriztionCheck, game.showCreateRoomPage);
router.post('/create-room', authoriztionCheck, game.createRoom);

router.get('/join-room', authoriztionCheck, game.showJoinRoomPage);
router.post('/join-room', authoriztionCheck, game.joinRoom);

router.get('/gamePvP', authoriztionCheck, game.showGamePvPPage);
router.post('/gamePvP', authoriztionCheck, game.joinRoom);


//logout
router.post('/logout', authoriztionCheck, mainController.logout)

module.exports = router;