// Category.js model
module.exports = (sequelize, Sequelize) => {
    const Quizz = sequelize.define('quizzes', {
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
        }

    },
    {
        timestamps: false
    });
    return Quizz;
  };
  
  
  
  