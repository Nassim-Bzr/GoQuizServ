//user.model.js

const bcrypt = require('bcrypt');

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
      id: {
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement : true
    },
      username: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      }
      ,
      score: {
        type: Sequelize.INTEGER
      },
      profilImgUrl:{
        type: Sequelize.STRING
      }
    });
  
    return User;
  };