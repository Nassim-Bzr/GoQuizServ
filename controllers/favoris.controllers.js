const db = require("../models/index");
const Favoris = db.favoris;
const Op = db.Sequelize.Op;
const UserFavoris = db.user_favoris;
const User = db.user;
const Quizz = db.quizz;
// Create and Save a new Quiz
exports.create = (req, res) => {
    // Validate request
    // if (!req.body.userId, req.body.quizzId) {
    //   res.status(400).send({
    //     message: "ça marche pas "
    //   });
    //   return;
    // }
  
    const favoris = {
      userId: req.body.userId,
      quizz_id: req.body.quizz_id
    }
    
  
    // Save Tutorial in the database
    Favoris.create(favoris)
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
  const userId = req.query.userId;
    var condition = userId ? { userId: userId } : null;
  
    Favoris.findAll({ where: condition })
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
  const userId = req.params.id;

  UserFavoris.findOne({
    where: { id: userId },
    include: [
      {
        model: User,
        attributes: ["id", "username"]
      },
      {
        model: Quizz,
        attributes: ["id", "title"]
      }
    ]
  })
  .then(data => {
    const username = data.user.username;
    const quizTitle = data.quizz.title;
    console.log(`Username: ${username}, Quiz Title: ${quizTitle}`);
  })
  .catch(err => {
    res.status(500).send({
      message: "Error retrieving favoris with id=" + favorisId
    });
  });
}
// Update a Quiz by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    Favoris.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Favoris was updated successfully."
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
  
    Favoris.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "favoris was deleted successfully!"
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
    favoris.destroy({
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
//     favoris.findAll({ where: { published: true } })
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