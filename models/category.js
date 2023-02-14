// Category.js model
module.exports = (sequelize, Sequelize) => {
  const Category = sequelize.define('category', {
    id: {
      type:Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement : true
  },
      name: {
          type: Sequelize.STRING
      },
      slug: { 
        type:Sequelize.STRING
      },
      imageUrl: { 
        type:Sequelize.STRING
      }
  });
  return Category;
};



