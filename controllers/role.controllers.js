// const db = require("../models/index");
// const Op = db.Sequelize.Op;

// // Create and Save a new Quiz
// exports.create = (req, res) => {
//     // Validate request
//     if (!req.body.score) {
//       res.status(400).send({
//         message: "ça marche pas zine!"
//       });
//       return;
//     }
  
//     // Create a Tutorial
//     const score = {
//       score: req.body.score
//     };
  
//     // Save Tutorial in the database
//     Score.create(score )
//       .then(data => {
//         res.send(data);
//       })
//       .catch(err => {
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while creating the Tutorial."
//         });
//       });
//   };

// // Retrieve all Tutorials from the database.
// exports.findAll = (req, res) => {
//     const score = req.query.score;
//     var condition = score ? { score: { [Op.iLike]: `%${score}%` } } : null;
  
//     Score.findAll({ where: condition })
//       .then(data => {
//         res.send(data);
//       })
//       .catch(err => {
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while retrieving tutorials."
//         });
//       });
//   };