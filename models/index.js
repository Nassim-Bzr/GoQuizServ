// models/index.js

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


db.quizz = require("../models/quizz")(sequelize, Sequelize);
db.score = require("../models/score")(sequelize, Sequelize);
db.user = require("../models/user.model")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.category = require("./category")(sequelize, Sequelize);
db.answer = require("../models/answer")(sequelize, Sequelize);
db.question = require("../models/question")(sequelize, Sequelize);
db.options = require("../models/options")(sequelize, Sequelize);
db.favoris = require("../models/favoris")(sequelize, Sequelize);


// une question a plusieurs answers

db.question.hasMany(db.answer, {
  foreignKey: "question_id",
  as: "answers"
});
// réciproque : une answer est lié à une seule question

db.answer.belongsTo(db.question, {
  foreignKey: "question_id",
  as: "questions"
});
// ATTENTION cas particulier : Question et Answer sont liés de 2 manières différentes!
// en effet, il y a aussi "la bonne réponse" !
db.question.belongsTo(db.answer, {
  foreignKey: "answer_id",
  as: "good_answer"
});


// Question : "un Quiz possède plusieurs Questions"
db.quizz.hasMany(db.question, {
  foreignKey: "quizz_id",
  as: "questions"
});
// et la réciproque: "une Question appartient à un seul Quiz"
db.question.belongsTo(db.quizz, {
  foreignKey: "quizz_id",
  as: "quizzes"
});

db.question.belongsToMany(db.options, {
  through: "question_option",
  foreignKey: "question_id",
  otherKey: "option_id",
  as: "options",
});
db.options.belongsToMany(db.question, {
  through: "question_option",
  foreignKey: "option_id",
  otherKey: "question_id",
  as: "questions",
});

// Quiz <> categorys, via la table de liaison
// "Un Quiz possède plusieurs categorys"
db.quizz.belongsToMany(db.category, {
  as: "category", // alias de l'association 
  through: 'quiz_has_category', // "via la table de liaison qui s'appelle ..."
  foreignKey: 'quizz_id', // le nom de la clef de Quiz dans la table de liaison
  otherKey: 'category_id', // le nom de la clef de "l'autre" (donc category)

});
// ... et la réciproque !
db.category.belongsToMany(db.quizz, {
  as: "quizzList",
  through: 'quiz_has_category',
  otherKey: 'quizz_id',
  foreignKey: 'category_id',
});



db.user.belongsToMany(db.quizz, {
  through: "user_favoris",
  foreignKey: "quizz_id",
  otherKey: "userId",
  timestamps: false
});
db.quizz.belongsToMany(db.user, {
  through: "user_favoris",
  foreignKey: "userId",
  otherKey: "quizz_id",
  timestamps: false
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