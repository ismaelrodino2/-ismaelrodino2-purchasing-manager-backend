const Product = require("../models/Product");
const jwt = require("jsonwebtoken");

module.exports = {
  async index(req, res) {
    const TokenArray = req.headers.authorization.split(" ");
    const auth = jwt.decode(TokenArray[1], process.env.ACCESS_TOKEN_SECRET);

    const products = await Product.findAll({
      where: { owner: auth.userId },
    });

    return res.json(products);
  },

  async store(req, res) {
    const { name, number, price } = req.body;
    const TokenArray = req.headers.authorization.split(" ");

    const auth = jwt.decode(TokenArray[1], process.env.ACCESS_TOKEN_SECRET);

    const product = await Product.create({
      name,
      number,
      price,
      owner: auth.userId,
    });

    return res.json(product);
  },

  async delete(req, res) {
    const { name, number, price, owner } = req.body;

    const TokenArray = req.headers.authorization.split(" ");
    const auth = jwt.decode(TokenArray[1], process.env.ACCESS_TOKEN_SECRET);

    const product = await Product.destroy({
      where: { name, number, price, owner:auth.userId },
    });

    return res.json(product);
  },
};
