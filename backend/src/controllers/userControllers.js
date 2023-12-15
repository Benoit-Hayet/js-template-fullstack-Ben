const models = require("../models");

const getUsers = (_, res) => {
  models.user
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const postUser = (req, res) => {
  models.user
    .create(req.body)
    .then(([rows]) => {
      res.send({ id: rows.insertId, ...req.body });
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
  // res.status(418).send(req.body)
};

module.exports = {
  getUsers,
  postUser,
};
