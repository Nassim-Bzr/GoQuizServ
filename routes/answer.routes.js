module.exports = app => {
    const answer = require("../controllers/answer.controllers");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", answer.createAnswer);
  
    // Retrieve all answer
    router.get("/", answer.getAnswers);
  
    // Retrieve all published answer
    // router.get("/published", answer.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", answer.getAnswer);
  
    // Update a Tutorial with id
   
    router.put("/:id", answer.updateAnswer);
  
    // Delete a Tutorial with id
    router.delete("/:id", answer.deleteAnswer);
  
    // Create a new Tutorial
    // router.delete("/", answer.deleteAll);
  
    app.use('/api/answer', router);
  };