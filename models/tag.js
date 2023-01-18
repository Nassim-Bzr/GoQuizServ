// const Sequelize = require('sequelize');
// const sequelize = require('../database');

// class Tag extends Sequelize.Model {};

// Tag.init({
//   name: Sequelize.STRING
// },{
//   sequelize,
//   tableName: "tag"
// });

// on exporte la class directement !
// module.exports = Tag;


module.exports = (sequelize, Sequelize) => {
  const Tag = sequelize.define("tag", {
    name: {
      type: Sequelize.STRING
    }
  });

  return Tag;
};




