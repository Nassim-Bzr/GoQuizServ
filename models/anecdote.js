// Anecdote.js model
module.exports = (sequelize, Sequelize) => {
    const Anecdote = sequelize.define('anecdote', {
        id: {
            type:Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement : true
        },
        text: {
            type: Sequelize.STRING
        },
        questionId: {
            type: Sequelize.INTEGER
        }
    });
    return Anecdote;
};
