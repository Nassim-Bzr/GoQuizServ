
const db = require("../models/index");
const QuizHasCategory = db.quiz_has_category;
const Category = db.category;
const Quizz = db.quizz;
const Op = db.Sequelize.Op;
const Question = db.question;
// Create and Save a new Quiz
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
      res.status(400).send({
        message: "ça marche pas zine!"
      });
      return;
    }
  
    // Create a Tutorial
    const quizz = {
      title: req.body.title,
      description: req.body.description
    };
  
    // Save Tutorial in the database
    Quizz.create(quizz )
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Tutorial."
        });
      });
  };

exports.findAll = (req, res) => {
  const category = req.query.category;
  var condition = category ? { '$category.name$': category} : null;

  Quizz.findAll({
    where: condition,
    include: [{
      model: Category,
      as: 'category',
      through: {
        model: QuizHasCategory,
        as: 'quiz_has_category'
      }
    }]
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving quizzes."
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Quizz.findOne({ 
      where: { id },
      include: [
        {
          model: Category,
          as: 'category',
          through: {
            model: QuizHasCategory,
            as: 'quiz_has_category'
          }
        },
        {
          model: Question,
          as: 'questions'
        }
      ]
    })
      .then(data => {
        if (data) {
          // Récupérez les questions associées
          const questions = data.questions;
          res.send({data, questions});
        } else {
          res.status(404).send({
            message: `Cannot find Quiz with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Quiz with id=" + id
        });
      });
  };
// Update a Question by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    Quizz.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Question was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Question with id=${id}. Maybe Question was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Question with id=" + id
        });
      });
  };

// Delete a Question with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Quizz.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Quizz was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Quizz with id=${id}. Maybe Quizz was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Quizz with id=" + id
        });
      });
  };

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Quizz.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Tutorials were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all tutorials."
        });
      });
  };

// Find all published Tutorials
// exports.findAllPublished = (req, res) => {
//     Quizz.findAll({ where: { published: true } })
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