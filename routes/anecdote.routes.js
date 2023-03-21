module.exports = app => {
    const anecdote = require("../controllers/anecdote.controllers");
  
    var router = require("express").Router();
  
    router.post("/", anecdote.createAnecdote);
  
    router.get("/", anecdote.getAnecdotes);
  

    router.get("/:id", anecdote.getAnecdote);
  
   
    router.put("/:id", anecdote.updateAnecdote);
  
    router.delete("/:id", anecdote.deleteAnecdote);
  
    // router.delete("/", anecdote.deleteAll);
  
    app.use('/api/anecdote', router);
  };