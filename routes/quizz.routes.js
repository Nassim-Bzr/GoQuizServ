const { authJwt } = require("../middleware"); // Assurez-vous que le chemin est correct

module.exports = app => {
    const quizz = require("../controllers/quizz.controllers");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", quizz.create);
  
    // Retrieve all quizz
    router.get("/", quizz.findAll);
  
    // Retrieve all published quizz
    router.get("/search", quizz.search);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", quizz.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", quizz.updateQuiz);
  
    // Delete a Tutorial with id
    router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], quizz.delete);
  
    // Create a new Tutorial
    router.delete("/", [authJwt.verifyToken, authJwt.isAdmin], quizz.deleteAll);
  
    app.use('/api/quizz', router);
};