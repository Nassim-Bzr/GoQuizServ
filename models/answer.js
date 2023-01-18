module.exports = (sequelize, Sequelize) => {

const Answer = sequelize.define('answer', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  text: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  correct: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
})
return Answer;
};