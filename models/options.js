// Proposition.js model
module.exports = (sequelize, Sequelize) => {
    const Proposition = sequelize.define('options', {
        id: {
            type:Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement : true
        },
        text: {
            type: Sequelize.STRING
        }
    },
    {
        timestamps: false
    });
    return Proposition;
};
