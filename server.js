const express = require("express");
const Sequelize = require('./models/index').Sequelize;
const sequelize = require('./models/index').sequelize;

const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:3006"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization,X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');

  // response to preflight request
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  }
  else {
    next();
  }
});
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./models/index");
const Role = db.role;


db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Db');
  initial();
});
// db.question.sync({force: true})

app.get("/", (req, res) => {
  res.json({ message: "Bienvenue dans l'API GoQuiz." });
});

function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "moderator"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });
}
// app.post('/api/score', (req, res) => {
//   const score = req.body;

//   // Store the score in the database, for example using a SQL library like sequelize:
 
//   const Score = sequelize.define('score', {
//     // user_id: {
//     //   type: sequelize.INTEGER
//     // },
//     // quiz_title: {
//     //   type: Sequelize.STRING
//     // },
//     // category: {
//     //   type: Sequelize.STRING
//     // },
//     score: {
//       type: Sequelize.INTEGER
//     },
//     date: {
//       type: Sequelize.DATE
//     }
//   });

//   Score.create({
//     // user_id: score.user_id,
//     // quiz_title: score.quiz_title,
//     // category: score.category,
//     score: score.score,
//     date: new Date()
//   })
//     .then(() => {
//       res.status(201).send('Score added');
//     })
//     .catch(error => {
//       res.status(400).send(error);
//     });
// });

// simple route
require('./routes/user.routes')(app);
require("./routes/category.routes")(app);
require("./routes/question.routes")(app);
// require("./routes/anecdote.routes")(app);
require("./routes/proposition.routes")(app);
require("./routes/score.routes")(app);
require("./routes/answer.routes")(app);
require("./routes/auth.routes")(app);





// set port, listen for requests
const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
