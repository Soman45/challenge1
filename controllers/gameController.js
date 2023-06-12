const {  gameRoom , Sequelize, sequelize } = require('../models');


class game {
    static showCreateRoomPage(req, res){
        res.render('GamePage/createRoom.ejs');
    }

    static showJoinRoomPage(req, res){
        res.render('GamePage/joinRoom.ejs');
    }

    static showGamePvPPage(req, res){
      const { roomCode, playerOne, playerTwo } = req.query;
      res.render('GamePage/gamePvP.ejs', { roomCode, playerOne, playerTwo });
    }


    static async createRoom(req, res) {
        const { name } = req.body;
        function generateRoomCode(length = 6) {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let code = '';
          
            for (let i = 0; i < length; i++) {
              const randomIndex = Math.floor(Math.random() * characters.length);
              code += characters.charAt(randomIndex);
            }
          
            return code;
          }
          
          try {
            const roomCode = generateRoomCode(); // Generate a unique room code
        
            // Create a new room in the database
            await gameRoom.create({ code: roomCode, name });
            res.render('GamePage/roomCreated', { code: roomCode });
            // res.json({ code: roomCode });
          } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Failed to create room' });
          }
      };

      
      static async joinRoom(req, res) {
        const { code, playerName } = req.body;

        try {
          const fightRoom = await gameRoom.findOne({ where: { code } });
      
          if (!fightRoom) {
            // Room not found, handle the error
            return res.render('GamePage/joinRoom', { error: 'Room not found' });
          }
      
          if (!fightRoom.playerOne) {
            fightRoom.playerOne = playerName;
          } else if (!fightRoom.playerTwo) {
            fightRoom.playerTwo = playerName;
          } else {
            return res.render('GamePage/joinRoom', { error: 'Room is already full' });
          }
      
          
          await fightRoom.save();
      
          // Redirect the players to the game page
          res.redirect('/gamePvP');
        } catch (error) {
          console.log(error);
          res.render('error', { error, message: 'Database Error' });
        }
      };
      

}

module.exports = {game};