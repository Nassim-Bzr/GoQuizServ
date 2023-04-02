const db = require("../models/index");
const Quizz = db.quizz;
const Category = db.category;
const Question = db.question;
const Op = db.Sequelize.Op;
const Answer = db.answer
// Create and Save a new Quiz
exports.create = (req, res) => {
  // Validate request
  if (!req.body.question) {
    res.status(400).send({
      message: "ça marche pas zine!"
    });
    return;
  }

  // Create a Tutorial
  const question = {
    question: req.body.question,
    anecdote: req.body.anecdote,
    wiki: req.body.wiki,
    answer_id: req.body.answer_id,
    quizz_id: req.body.quizz_id

  };

  // Save Tutorial in the database
  Question.create(question)
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

// Retrieve all Tutorials from the database.
// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const question = req.query.question;
  const quizzId = req.query.quizzId;
  var condition = question ? { question: { [Op.iLike]: `%${question}%` } } : null;
  if (quizzId) {
    condition = {
      ...condition,
      quizz_id: quizzId
    };
  }
  Question.findAll({
    where: condition,
    include: [
      {
        model: Answer,
        as: "answers"
      },
      {
        model: Quizz,
        as: "quizzes"
      }
    ]
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};
// Find a single Tutorial with an id
exports.findOne = async (req, res) => {
  const id = req.params.id;

  Question.findByPk(id, {
    include: [
      {
        model: Answer,
        as: "answers"
      },
      {
        model: Quizz,
        as: "quizzes",
        include: [
          {
            model: Category,
            as: "categories"
          }
        ]
      }
    ]
  })
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Question with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Question with id=" + id
      });
    });
};

// Update a Question by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Question.update(req.body, {
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

  Question.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Question was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Question with id=${id}. Maybe Question was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Question with id=" + id
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Question.destroy({
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
//     Question.findAll({ where: { published: true } })
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