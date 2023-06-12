const { datauser, userhistory, Sequelize, sequelize } = require('../models');
const cryptojs = require('crypto-js');
class crudcontroller {
    static async showDataUserPage(req, res) {
        try{
            //ambil data customer di db
            let user = await datauser.findAll();
            user = user.map(function (data){
                return data.toJSON()
            })
            //tampilkan halaman
            res.render('DataUser', {datauser: user})
        }catch(error){
          console.log(error);
          res.status(500).send('Internal Server Error!')
        }
    }

    static async showDataUser(req, res) {
        try {
          const data = await datauser.findAll();
          res.render('cu', { isUpdate: false, datauser: data });
        } catch (error) {
          console.log(error);
          res.status(500).send('Internal Server Error!');
        }
      }; 
    
    
      static async addDataUser(req, res) {
        const transaction = await sequelize.transaction()
        try {
          // ambil data dari body
          const { username, email, password, ...sisa } = req.body;
          // simpan data ke database
          const {hashedPassword} = cryptojs.HmacSHA256(password, process.env.SECRET_LOGIN).toString();
          const userData = await datauser.create({ username, email, password:hashedPassword }, { transaction });
          await userhistory.create({ ...sisa, userId: userData.id }, { transaction });
          await transaction.commit();
          console.log(userData);
          // jika berhasil, redirect ke halaman utama
          res.redirect('/DataUser');
        } catch(error) {
          await transaction.rollback();
          console.log(error)
          res.status(500).send('Internal Server Error !')
        }
      
      };  
    
      static async showUpdateDataUser(req, res) {
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
      
      };
    
      static async updateDataUser(req, res) {
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
          res.redirect('/DataUser');
        } catch(error) {
          await transaction.rollback();
          console.log(error)
          res.status(500).send('Internal Server Error !')
        }
      
      };
    
      static async deleteDataUser(req, res) {
        const transaction = await sequelize.transaction()
        try {
          //ambil query
          const id = req.query.id
          //update data
          await userhistory.destroy({where: {userId:id},  transaction }); 
          await datauser.destroy({where:{id},  transaction});
          await transaction.commit();
          // jika berhasil, redirect ke halaman utama
          res.redirect('/DataUser');
        } catch(error) {
          await transaction.rollback();
          console.log(error)
          res.status(500).send('Internal Server Error !')
        }
      }
}

module.exports = {crudcontroller};