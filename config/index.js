const {Sequelize} = require('sequelize');

const sequelize = new Sequelize({
        host:process.env.PG_DATABASE_HOST,
        port:process.env.PG_DATABASE_PORT,
        database:process.env.PG_DATABASE_NAME,
        username: process.env.PG_DATABASE_USER,
        password: process.env.PG_DATABASE_PASSWORD,
        dialect: 'postgres'
});

module.exports = {sequelize};