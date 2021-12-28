const Product = require("../models/Product");

module.exports = {
  async index(req, res) {
    const products = await Product.findAll();
    return res.json(products);
  },

  async store(req, res) {
    const { name, number, price } = req.body;

    const product = await Product.create({ name, number, price });

    return res.json(product);
  },
};
