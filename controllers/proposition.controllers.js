const Proposition = require('../models').proposition;

module.exports = {
    // Create a new proposition
    createProposition(req, res) {
        return Proposition
            .create({
                text: req.body.text,
                questionId: req.body.questionId
            })
            .then(proposition => res.status(201).send(proposition))
            .catch(error => res.status(400).send(error));
    },

    // Get all Propositions
    getPropositions(req, res) {
        return Proposition
            .findAll()
            .then(Propositions => res.status(200).send(Propositions))
            .catch(error => res.status(400).send(error));
    },

    // Get a single proposition by id
    getProposition(req, res) {
        return Proposition
            .findByPk(req.params.id)
            .then(proposition => {
                if (!proposition) {
                    return res.status(404).send({
                        message: 'Proposition Not Found',
                    });
                }
                return res.status(200).send(proposition);
            })
            .catch(error => res.status(400).send(error));
    },

    // Update an proposition by id
    updateProposition(req, res) {
        return Proposition
            .findByPk(req.params.id)
            .then(proposition => {
                if (!proposition) {
                    return res.status(404).send({
                        message: 'Proposition Not Found',
                    });
                }
                return proposition
                    .update({
                        text: req.body.text || proposition.text,
                        questionId: req.body.questionId || proposition.questionId,
                    })
                    .then(() => res.status(200).send(proposition))
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },

    // Delete an proposition by id
    deleteProposition(req, res) {
        return Proposition
            .findByPk(req.params.id)
            .then(proposition => {
                if (!proposition) {
                    return res.status(404).send({
                        message: 'Proposition Not Found',
                    });
                }
                return proposition
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch(error => res.status(400).send(error));
                  })
                  .catch(error => res.status(400).send(error));
          }
      };