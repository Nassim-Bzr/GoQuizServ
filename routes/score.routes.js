module.exports = app => {
    const score = require("../controllers/score.controllers");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/score", score.create);
    router.get("/score", score.findAll);

    app.use('/api', router);
}