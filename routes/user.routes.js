const { authJwt } = require("../middleware");
const userController = require("../controllers/user.controllers");

module.exports = app => {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", userController.allAccess);

  app.get(
    "/api/test/user",
    [authJwt.verifyToken],
    userController.userBoard
  );

  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    userController.moderatorBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    userController.adminBoard
  );

  const router = require("express").Router();

  router.post("/", userController.createUser);
  router.get("/",  userController.getUsers);
  router.get("/:id", [authJwt.verifyToken], userController.getUser);
  router.put("/:id",  userController.updateUser);
  router.delete("/:id", [authJwt.verifyToken], userController.deleteUser);
  // router.delete("/", [authJwt.verifyToken], userController.deleteAllUsers);

  app.use("/api/users", router);
};