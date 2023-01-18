const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: 0,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("../models/answer")(sequelize,Sequelize);
db.users = require("../models/user.model")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);
db.quiz = require("../models/quiz")(sequelize, Sequelize);
db.tag = require("../models/tag")(sequelize, Sequelize);
db.answer = require ("../models/answer")(sequelize,Sequelize);
db.question = require("../models/question")(sequelize, Sequelize);

const Answer = require ("../models/answer");
const Question = require ("../models/question");

// Question.hasMany(Answer, { as: 'answers' });
// Answer.belongsTo(Question);

// db.role.belongsToMany(db.users, {
//   through: "user_roles",
//   foreignKey: "roleId",
//   otherKey: "userId"
// });
// db.users.belongsToMany(db.role, {
//   through: "user_roles",
//   foreignKey: "userId",
//   otherKey: "roleId"
// });

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;