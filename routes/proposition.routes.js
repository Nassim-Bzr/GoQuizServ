module.exports = app => {
    const proposition = require("../controllers/proposition.controllers");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", proposition.createProposition);
  
    // Retrieve all proposition
    router.get("/", proposition.getPropositions);
  
    // Retrieve all published proposition
    // router.get("/published", proposition.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", proposition.getProposition);
  
    // Update a Tutorial with id
   
    router.put("/:id", proposition.updateProposition);
  
    // Delete a Tutorial with id
    router.delete("/:id", proposition.deleteProposition);
  
    // Create a new Tutorial
    // router.delete("/", proposition.deleteAll);
  
    app.use('/api/proposition', router);
  };