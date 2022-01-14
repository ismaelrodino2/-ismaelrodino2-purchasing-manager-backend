const User = require("../models/User");
const jwt = require("jsonwebtoken");

module.exports = {
  async index(req, res) {
    const TokenArray = req.headers.authorization.split(" ");
    const auth = jwt.decode(TokenArray[1], process.env.ACCESS_TOKEN_SECRET);

    const users = await User.findAll({
      where: { owner: auth.userId },
    });

    return res.json(users);
  },

  async store(req, res) {
    const { name, email } = req.body;
    const TokenArray = req.headers.authorization.split(" ");
    const auth = jwt.decode(TokenArray[1], process.env.ACCESS_TOKEN_SECRET);
    const user = await User.create({ name, email, owner: auth.userId });

    return res.json(user);
  },

  async delete(req, res) {
    const { name, email } = req.body;
    const TokenArray = req.headers.authorization.split(" ");
    const auth = jwt.decode(TokenArray[1], process.env.ACCESS_TOKEN_SECRET);

    const user = await User.destroy({
      where: { name, email, owner: auth.userId },
    });

    return res.json(user);
  },
};
