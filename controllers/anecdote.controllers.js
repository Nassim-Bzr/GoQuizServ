

const Anecdote = require('../models').anecdote;

module.exports = {
    // Create a new answer
    createAnecdote(req, res) {
        return Anecdote
            .create({
                text: req.body.text
              
            })
            .then(anecdote => res.status(201).send(anecdote))
            .catch(error => res.status(400).send(error));
    },

    // Get all anecdotes
    getAnecdotes(req, res) {
        return Anecdote
            .findAll()
            .then(anecdote => res.status(200).send(anecdote))
            .catch(error => res.status(400).send(error));
    },

    // Get a single answer by id
    getAnecdote(req, res) {
        return Anecdote
            .findByPk(req.params.id)
            .then(anecdote => {
                if (!anecdote) {
                    return res.status(404).send({
                        message: 'Answer Not Found',
                    });
                }
                return res.status(200).send(anecdote);
            })
            .catch(error => res.status(400).send(error));
    },

    // Update an answer by id
    updateAnecdote(req, res) {
        return Anecdote
            .findByPk(req.params.id)
            .then(anecdote => {
                if (!anecdote) {
                    return res.status(404).send({
                        message: 'anecdote Not Found',
                    });
                }
                return anecdote
                    .update({
                        text: req.body.text || anecdote.text
                       
                    })
                    .then(() => res.status(200).send(answer))
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },

    // Delete an answer by id
    deleteAnecdote(req, res) {
        return Anecdote
            .findByPk(req.params.id)
            .then(anecdote => {
                if (!anecdote) {
                    return res.status(404).send({
                        message: 'anecdote Not Found',
                    });
                }
                return anecdote
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch(error => res.status(400).send(error));
                  })
                  .catch(error => res.status(400).send(error));
          }
      };