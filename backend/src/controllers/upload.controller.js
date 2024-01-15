const models = require("../models");

const getList = async (req, res) => {
  try {
    const [result] = await models.upload.findAll();
    return res.send(result);
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
};

const create = async (req, res) => {
  try {
    const result = await models.upload.create(req.file);
    await models.user.addAvatar(req.user.id, result.id);
    return res.status(201).send({ ...req.user, avatar: result });
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
};

module.exports = { getList, create };
