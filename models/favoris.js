// Category.js model
module.exports = (sequelize, Sequelize) => {
    const Favoris = sequelize.define('favoris', {
        id: {
            type:Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement : true
        }
    },
    {
        timestamps: false
    });
    return Favoris;
  };
  
  
  
  