module.exports = (sequelize, Sequelize) => {
    const Score = sequelize.define("score", {
        user_id: {
          type: Sequelize.INTEGER
        },
        quiz_title: {
          type: Sequelize.STRING
        },
        category: {
          type: Sequelize.STRING
        },
        score: {
          type: Sequelize.INTEGER
        },
        date: {
          type: Sequelize.DATE
        }
      });
    
  
    return Score;
  };

  