
module.exports = (sequelize, Sequelize) => {
  const Question = sequelize.define('question', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    question: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
  
 
  

  

  return Question;
};