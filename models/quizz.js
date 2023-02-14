// Category.js model
module.exports = (sequelize, Sequelize) => {
    const Quizz = sequelize.define('quizz', {
        id: {
            type:Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement : true
        },
        title: {
            type: Sequelize.STRING
        },
        description: { 
          type:Sequelize.STRING
        },
        questionId: { 
          type:Sequelize.INTEGER
        },
        
        categoryId: { 
          type:Sequelize.INTEGER
        }

    });
    return Quizz;
  };
  
  
  
  