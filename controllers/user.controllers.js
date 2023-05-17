const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const User = require('../models').user;
const Role = require('../models/role.model')
const jwtSecret = process.env.JWT_SECRET || 'secretkey';


// exports.allAccess = (req, res) => {
//     res.status(200).send("Public Content.");
// };

// exports.userBoard = (req, res) => {
//     res.status(200).send("User Content.");
// };

// exports.adminBoard = (req, res) => {
//     res.status(200).send("Admin Content.");
// };

// exports.moderatorBoard = (req, res) => {
//     res.status(200).send("Moderator Content.");
// };


module.exports = {

    async allAccess(req, res) {
        try {

            return res.status(200).send("Public Content.");

        } catch (error) {
            return res.status(400).send(error);
        }
    },

    async userBoard(req, res) {
        try {

            return res.status(200).send("user Content.");

        } catch (error) {
            return res.status(400).send(error);
        }
    },

    async adminBoard(req, res) {
        try {

            return res.status(200).send("Admin Content.");

        } catch (error) {
            return res.status(400).send(error);
        }
    },

    async moderatorBoard(req, res) {
        try {

            return res.status(200).send("moderatorBoard Content.");

        } catch (error) {
            return res.status(400).send(error);
        }
    },

    async createUser(req, res) {
        try {
            const saltRounds = 10;
            const hash = await bcrypt.hash(req.body.password, saltRounds);

            const user = await User.create({
                username: req.body.username,
                email: req.body.email,
                password: hash,
                score: req.body.score,
                favorisId: req.body.favorisId,
                profilImgUrl: req.body.profilImgUrl,
            });

            const userRole = await Role.findOne({ where: { name: 'user' } });
            if (userRole) {
                await user.setRoles([userRole.id]);
            }

            return res.status(201).send(user);
        } catch (error) {
            return res.status(400).send(error);
        }
    },


    async getUsers(req, res) {
        try {
            const users = await User.findAll();
            return res.status(200).send(users);
        } catch (error) {
            return res.status(400).send(error);
        }
    },

    async getUser(req, res) {
        try {
            const user = await User.findByPk(req.params.id);
            if (!user) {
                return res.status(404).send({
                    message: 'User Not Found',
                });
            }
            return res.status(200).send(user);
        } catch (error) {
            return res.status(400).send(error);
        }
    },

    async updateUser(req, res) {
        try {
            const user = await User.findByPk(req.params.id);
            if (!user) {
                return res.status(404).send({
                    message: 'User Not Found',
                });
            }

            if (req.body.role === 'admin') {
                const adminRole = await Role.findOne({ where: { name: 'admin' } });
                if (adminRole) {
                    await user.setRoles([adminRole.id]);
                }
            }
            // Si un nouveau mot de passe est fourni, vérifiez que le mot de passe actuel est correct
            if (req.body.password) {
                const currentPassword = req.body.currentPassword;
                if (!currentPassword) {
                    return res.status(400).send({
                        message: 'Mot de passe actuel manquant.',
                    });
                }

                const isMatch = await bcrypt.compare(currentPassword, user.password);
                if (!isMatch) {
                    return res.status(400).send({
                        message: 'Mot de passe actuel incorrect.',
                    });
                }

                // Si le mot de passe actuel est correct, hachez et mettez à jour le nouveau mot de passe
                const saltRounds = 10;
                const updatedPassword = await bcrypt.hash(req.body.password, saltRounds);
                user.password = updatedPassword;
            }

            // Continuez la mise à jour comme d'habitude
            await user.update({
                username: req.body.username || user.username,
                email: req.body.email || user.email,
                score: req.body.score || user.score,
                favorisId: req.body.favorisId || user.favorisId,
                profilImgUrl: req.body.profilImgUrl || user.profilImgUrl,
            });


            if (req.body.role === 'admin') {
                const adminRole = await Role.findOne({ where: { name: 'admin' } });
                if (adminRole) {
                    await user.setRoles([adminRole.id]);
                }
            }

            return res.status(200).send(user);
        } catch (error) {
            return res.status(400).send(error);
        }
    },
    async deleteUser(req, res) {
        try {
            const user = await User.findByPk(req.params.id);
            if (!user) {
                return res.status(404).send({
                    message: 'User Not Found',
                });
            }

            await user.destroy();
            return res.status(204).send();
        } catch (error) {
            return res.status(400).send(error);
        }
    },

    async loginUser(req, res) {
        try {
            const user = await User.findOne({
                where: {
                    username: req.body.email
                }
            });

            if (!user) {
                return res.status(404).send({
                    message: 'User Not Found',
                });
            }

            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if (!validPassword) {
                return res.status(401).send({
                    message: 'Invalid Password',
                });
            }

            const token = jsonwebtoken.sign({
                id: user.id,
                username: user.username,
            }, jwtSecret, {
                expiresIn: '1h'
            });

            return res.status(200).send({
                message: 'Successful Login',
                token: token,
            });
        } catch (error) {
            return res.status(400).send(error);
        }
    }
};