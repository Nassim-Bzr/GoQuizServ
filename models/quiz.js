module.exports = (sequelize, Sequelize) => {
  const Quiz = sequelize.define("quiz", {
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    }
  });

  return Quiz;
};









// const Sequelize = require('sequelize');
// const sequelize = require('../config/db.config.js');

// class Quiz extends Sequelize.Model {};


// // Initialisation façon Sequelize (cf. Level pour plus de détails)
// Quiz.init({
//   title: Sequelize.STRING,
//   description: Sequelize.STRING
// },{
//   sequelize,
//   tableName: "quiz"
// });

// module.exports = Quiz;