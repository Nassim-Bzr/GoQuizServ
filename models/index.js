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

db.score = require("../models/score")(sequelize,Sequelize);
db.user = require("../models/user.model")(sequelize,Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.category = require("./category")(sequelize, Sequelize);
db.answer = require ("../models/answer")(sequelize,Sequelize);
db.question = require("../models/question")(sequelize, Sequelize);
db.anecdote = require("../models/anecdote")(sequelize, Sequelize);
db.proposition = require("../models/proposition")(sequelize, Sequelize);


db.question.belongsTo(db.category);
// db.question.hasMany(db.proposition);
db.question.hasMany(db.answer);
db.question.hasMany(db.anecdote);
db.proposition.belongsTo(db.question);
db.answer.belongsTo(db.question);
db.anecdote.belongsTo(db.question);

db.category.belongsToMany(db.question, {
  through: "category_has_question",
  foreignKey: "categoryId",
  otherKey: "questionId"
});


db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;