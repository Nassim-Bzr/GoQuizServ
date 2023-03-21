module.exports = (sequelize, Sequelize) => {
  const Score = sequelize.define("score", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true, 
      autoIncrement: true

    },
    score: {
      type: Sequelize.INTEGER
    },
    date: {
      type: Sequelize.DATE
    }
  },
  {
      timestamps: false
  });


  return Score;
};

