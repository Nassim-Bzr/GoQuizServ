// Answer.js model
module.exports = (sequelize, Sequelize) => {
    const Answer = sequelize.define('answers', {
        id: {
            type:Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement : true
        },

        text: {
            type: Sequelize.STRING
        },
        anecdote: {
            type: Sequelize.STRING
        },
        questionId: {
            type: Sequelize.INTEGER
        }
    });
    return Answer;
};
