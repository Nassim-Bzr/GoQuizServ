module.exports = (sequelize, Sequelize) => {
    const GoodAnswer = sequelize.define("good_answer", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      }
    });
  
    return GoodAnswer;
  };