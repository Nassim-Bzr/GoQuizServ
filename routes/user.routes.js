module.exports = app => {
  const user = require("../controllers/user.controller");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", user.create);

  // // Retrieve all Tutorials
  router.get("/", user.findAll);

  // // Retrieve all published Tutorials
  // // router.get("/published", user.findAllPublished);

  // // Retrieve a single Tutorial with id
  router.get("/:id", user.findOne);

  // Update a Tutorial with id
 
  router.put("/:id", user.update);

  // Delete a Tutorial with id
  router.delete("/:id", user.delete);

  // Create a new Tutorial
  router.delete("/", user.deleteAll);

  app.use('/api/user', router);
};









// const { authJwt } = require("../middleware");
// const controller = require("../controllers/user.controller");

// module.exports = function(app) {
//   app.use(function(req, res, next) {
//     res.header(
//       "Access-Control-Allow-Headers",
//       "x-access-token, Origin, Content-Type, Accept"
//     );
//     next();
//   });

//   app.get("/api/test/all", controller.allAccess);

//   app.get(
//     "/api/test/user",
//     [authJwt.verifyToken],
//     controller.userBoard
//   );

//   app.get(
//     "/api/test/mod",
//     [authJwt.verifyToken, authJwt.isModerator],
//     controller.moderatorBoard
//   );

//   app.get(
//     "/api/test/admin",
//     [authJwt.verifyToken, authJwt.isAdmin],
//     controller.adminBoard
//   );
// };
