
const db = require("../models/index");
const QuizHasCategory = db.quiz_has_category;
const Category = db.category;
const Answer = db.answer;
const GoodAnswer = db.good_answer;
const Quizz = db.quizz;
const Op = db.Sequelize.Op;
const Question = db.question;
// Create and Save a new Quiz
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title || !req.body.questions || !req.body.category) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Quiz
  const quizData = {
    title: req.body.title,
  };

  // Save Quiz in the database
  Quizz.create(quizData)
  .then(quiz => {
    const questions = req.body.questions.map(questionData => {
      const { question, answers, correct } = questionData;
      return Question.create({
        question,
        quizz_id: quiz.id,
      }).then((createdQuestion) => {
        // Create answers
        const answerPromises = answers.map((answerText, index) => 
          Answer.create({
            answerText,
            isCorrect: index === correct,
            question_id: createdQuestion.id
          })
        );

        Promise.all(answerPromises)
          .then((createdAnswers) => {
            // Create good answer
            const correctAnswer = createdAnswers[correct];
            return GoodAnswer.create({
              question_id: createdQuestion.id,
              answer_id: correctAnswer.id
            });
          });
      });
    });

    Promise.all(questions)
      .then(() => {
        res.send({message: 'Quiz created successfully'});
      })
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Quiz."
    });
  });
};


exports.search = (req, res) => {
  const title = req.query.title ? req.query.title.toLowerCase() : null;
  var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null; // Modifiez la condition de recherche

  Quizz.findAll({
    where: condition,
    include: [
      {
        model: Category,
        as: 'category',
        through: {
          model: QuizHasCategory,
          as: 'quiz_has_category'
        }
      }
    ]
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving quizzes."
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
exports.updateQuiz = (req, res) => {
  const id = req.params.id;

  Quizz.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Quiz was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Quiz with id=${id}. Maybe Quiz was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Quiz with id=" + id
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
