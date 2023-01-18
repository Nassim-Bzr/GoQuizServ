const db = require("../models/index");
const Quiz = db.quiz;
const Op = db.Sequelize.Op;

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
    const quiz = {
      title: req.body.title,
      description: req.body.description
    };
  
    // Save Tutorial in the database
    Quiz.create(quiz)
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
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;
  
    Quiz.findAll({ where: condition })
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
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Quiz.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
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

// Update a Quiz by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    Quiz.update(req.body, {
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

// Delete a Quiz with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Quiz.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Quiz was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Quiz with id=${id}. Maybe Quiz was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Quiz with id=" + id
        });
      });
  };

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Quiz.destroy({
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
exports.findAllPublished = (req, res) => {
    Quiz.findAll({ where: { published: true } })
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