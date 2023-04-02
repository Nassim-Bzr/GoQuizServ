module.exports = app => {
    const favoris = require("../controllers/favoris.controllers");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", favoris.create);
  
    // Retrieve all favoris
    router.get("/", favoris.findAll);
  
    // Retrieve all published favoris
    // router.get("/published", favoris.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", favoris.findOne);
  
    // Update a Tutorial with id
   
    router.put("/:id", favoris.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", favoris.delete);
  
    // Create a new Tutorial
    // router.delete("/", favoris.deleteAll);
  
    app.use('/api/favoris', router);
  };