// Category.js model
module.exports = (sequelize, Sequelize) => {
    const Favoris = sequelize.define('favoris', {
        id: {
            type:Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement : true
        },
        
        favoris: { 
          type:Sequelize.INTEGER
        }

    },
    {
        timestamps: false
    });
    return Favoris;
  };
  
  
  
  