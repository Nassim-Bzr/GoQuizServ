module.exports = app => {
    const question = require("../controllers/question.controllers");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", question.create);
  
    // Retrieve all question
    router.get("/", question.findAll);
  
    // Retrieve all published question
    // router.get("/published", question.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", question.findOne);
  
    // Update a Tutorial with id
   
    router.put("/:id", question.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", question.delete);
  
    // Create a new Tutorial
    router.delete("/", question.deleteAll);
  
    app.use('/api/question', router);
  };