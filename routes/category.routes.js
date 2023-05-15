module.exports = app => {
    const categorys = require("../controllers/category.controllers");
    const authJwt = require("../middleware/authJwt");

    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", categorys.create);
  
    // Retrieve all quizz
    router.get("/", categorys.findAll);
  
    // Retrieve all published categorys
    // router.get("/published", categorys.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:name", categorys.findByName);
  
    // Update a Tutorial with id
    app.get("/api/user/profile", authJwt.authenticateUser, (req, res) => {
      // Cette route nécessite que l'utilisateur ait le rôle "user"
      // Effectuez les actions réservées aux utilisateurs ici
      res.status(200).json({ message: "Profil de l'utilisateur." });
    });

    router.put("/:id", categorys.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", categorys.delete);
  
    // Create a new Tutorial
    router.delete("/", categorys.deleteAll);
  
    app.use('/api/category', router);
  };