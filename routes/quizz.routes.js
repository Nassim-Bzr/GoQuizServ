module.exports = app => {
    const quizz = require("../controllers/quizz.controllers");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", quizz.create);
  
    // Retrieve all quizz
    router.get("/", quizz.findAll);
  
    // Retrieve all published quizz
    // router.get("/published", quizz.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", quizz.findOne);
  
    // Update a Tutorial with id
   
    router.put("/:id", quizz.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", quizz.delete);
  
    // Create a new Tutorial
    router.delete("/", quizz.deleteAll);
  
    app.use('/api/quizz', router);
  };