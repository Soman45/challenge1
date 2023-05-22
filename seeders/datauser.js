'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

     await queryInterface.bulkInsert('datausers', [{
       username: 'John',
       email: 'john@gmail.com',
       password:'abcd',
       approved:true
     },
    {
      username: 'Anton',
       email: 'anton@gmail.com',
       password:'1234',
       approved:true
    },
  {
       username: 'Andi123',
       email: 'andi@gmail.com',
       password:'ab12',
       approved:true
  }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('datauser', null, {});
  }
};
