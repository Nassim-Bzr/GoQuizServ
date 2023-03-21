const db = require("../models/index");
const Question = db.question;
const Quizz = db.quizz;

const Answer = require('../models').answer;

module.exports = {
    // Create a new answer
    createAnswer(req, res) {
        return Answer
            .create({
                text: req.body.text,

                question_id: req.body.question_id
            })
            .then(answer => res.status(201).send(answer))
            .catch(error => res.status(400).send(error));
    },

    // Get all answers
    getAnswers(req, res) {
        return Answer
            .findAll()
            .then(answers => res.status(200).send(answers))
            .catch(error => res.status(400).send(error));
    },

    // Get a single answer by id
    getAnswer(req, res) {
        return Answer
            .findByPk(req.params.id, {
                include: [
                    {
                        model: Question,
                        as: "questions",
                        include: {
                            model: Quizz,
                            as: "quizzes"
                        }
                    }
                ]
            })
            .then(answer => {
                if (!answer) {
                    return res.status(404).send({
                        message: 'Answer Not Found',
                    });
                }
                return res.status(200).send(answer);
            })
            .catch(error => res.status(400).send(error));
    },

    // Update an answer by id
    updateAnswer(req, res) {
        return Answer
            .findByPk(req.params.id)
            .then(answer => {
                if (!answer) {
                    return res.status(404).send({
                        message: 'Answer Not Found',
                    });
                }
                return answer
                    .update({
                        text: req.body.text || answer.text,
                        anecdote: req.body.anecdote || answer.anecdote,
                        questionId: req.body.questionId || answer.questionId
                    })
                    .then(() => res.status(200).send(answer))
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },

    // Delete an answer by id
    deleteAnswer(req, res) {
        return Answer
            .findByPk(req.params.id)
            .then(answer => {
                if (!answer) {
                    return res.status(404).send({
                        message: 'Answer Not Found',
                    });
                }
                return answer
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    }
};