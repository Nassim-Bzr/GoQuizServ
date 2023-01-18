module.exports = app => {
    const tags = require("../controllers/tag.controllers");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", tags.create);
  
    // Retrieve all quizz
    router.get("/", tags.findAll);
  
    // Retrieve all published tags
    // router.get("/published", tags.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", tags.findOne);
  
    // Update a Tutorial with id
   
    router.put("/:id", tags.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", tags.delete);
  
    // Create a new Tutorial
    router.delete("/", tags.deleteAll);
  
    app.use('/api/tag', router);
  };