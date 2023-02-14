// Category.js model
module.exports = (sequelize, Sequelize) => {
    const Favoris = sequelize.define('favoris', {
        id: {
            type:Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement : true
        },
        
        userId: { 
          type:Sequelize.INTEGER
        },
        
        quizzId: { 
          type:Sequelize.INTEGER
        }

    });
    return Quizz;
  };
  
  
  
  