const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models/index");
const User = db.user;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Admin Role!"
      });
      return;
    });
  });
};

isModerator = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Moderator Role!"
      });
    });
  });
};

isModeratorOrAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }

        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Moderator or Admin Role!"
      });
    });
  });
};
const authenticateUser = async (req, res, next) => {
  try {
    // Obtenez l'utilisateur actuel à partir de l'ID stocké dans le jeton d'accès
    const userId = req.userId;
    const user = await User.findByPk(userId);

    // Vérifiez si l'utilisateur a le rôle "user"
    const hasUserRole = await user.hasRole("user");

    if (hasUserRole) {
      // L'utilisateur a le rôle "user"
      // Poursuivre le flux d'exécution
      next();
    } else {
      // L'utilisateur n'a pas le rôle "user"
      res.status(403).json({ message: "Accès refusé. Vous devez avoir le rôle 'user'." });
    }
  } catch (error) {
    res.status(500).json({ message: "Une erreur est survenue lors de l'authentification de l'utilisateur." });
  }
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isModerator: isModerator,
  isModeratorOrAdmin: isModeratorOrAdmin,
  authenticateUser: authenticateUser // Ajoutez cette ligne pour exporter le middleware d'authentification
};

module.exports = authJwt;