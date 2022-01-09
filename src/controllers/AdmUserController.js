const AdmUser = require("../models/AdmUser");

const jwt = require("jsonwebtoken");
const { append } = require("express/lib/response");
const express = require("express");
const app = express();
app.use(express.json());

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

    const token = jwt.sign(
      { userId: user.id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: '1d',
      }
    );

    if (!user) {
      return res.status(400).send("Cannot find user");
    }
    if (user.password === password) {
      res.json({ auth: true, token });
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
