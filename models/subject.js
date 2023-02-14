// Category.js model
module.exports = (sequelize, Sequelize) => {
    const Subject = sequelize.define('subject', {
        id: {
            type:Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement : true
        },
        title: {
            type: Sequelize.STRING
        },
        description: { 
          type:Sequelize.STRING
        },
        
        categoryId: { 
          type:Sequelize.INTEGER
        }

    });
    return Subject;
  };
  
  
  
  