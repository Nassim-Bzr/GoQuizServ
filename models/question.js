// Question.js model
module.exports = (sequelize, Sequelize) => {
    const Question = sequelize.define('questions', {
        id: {
            type:Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement : true
        },
        question: {
            type: Sequelize.STRING
        },
        proposition: {
            type: Sequelize.STRING
        },
        answer: {
            type: Sequelize.STRING
        },
        anecdote: {
            type: Sequelize.STRING
        },
        quizzId: {
            type: Sequelize.INTEGER
        }
    });
    return Question;
};
