// Question.js model
module.exports = (sequelize, Sequelize) => {
    const Question = sequelize.define('questions', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        question: {
            type: Sequelize.STRING
        },
        anecdote: {
            type: Sequelize.STRING,

            },
        wiki:{
            type: Sequelize.STRING,
        }

        }     ,
        {
            timestamps: false
        }      
    );
    return Question;
    }