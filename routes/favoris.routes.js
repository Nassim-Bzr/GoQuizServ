// module.exports = app => {
//   const favoris = require("../controllers/favoris.controllers");
// const UserFavoris = db.user_favoris;
//   var router = require("express").Router();

//   // Create a new Tutorial
//   router.post('/:userId/favorites', (req, res) => {
//     const userId = req.params.userId;
//     const quizzId = req.body.quizzId;

//     UserFavoris.create({
//       userId: userId,
//       quizzId: quizzId
//     })
//       .then(() => {
//         res.send({ message: 'Quizz added to favorites successfully' });
//       })
//       .catch(err => {
//         res.status(500).send({
//           message: err.message || 'Some error occurred while adding the quizz to favorites.'
//         });
//       });
//   });

//   // Le reste du code...

//   // Exporter la variable router
//   app.use('/api/favoris', router);
// };