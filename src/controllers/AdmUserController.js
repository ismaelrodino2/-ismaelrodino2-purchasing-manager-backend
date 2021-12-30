const AdmUser = require("../models/AdmUser");

module.exports = {
  async index(req, res) {
    const users = await AdmUser.findAll();
    return res.json(users);
  },

  async logon(req, res) {
    const { userName, password } = req.body;

    const user = await AdmUser.findOne({
      where: { userName },
    });

    if (!user) {
      return res.status(400).send("Cannot find user");
    }
    if (user.password === password) {
      res.status(200).send("Success");
    } else {
      res.status(400).send("Not Allowed");
    }
  },

  async store(req, res) {
    const { userName, password } = req.body;

    const admUser = await AdmUser.create({ userName, password });

    return res.json(admUser);
  },
};
